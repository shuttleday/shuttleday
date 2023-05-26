import { NextFunction, Request, Response, Router } from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import fileUpload from "express-fileupload";
import { isValidObjectId, s3 } from "../utils/functions.js";
import { GameSessions, Rooms } from "../db/collections.js";
import { validateFileUpload } from "../middleware/validateRequest.js";
import { ApiError } from "../utils/error-util.js";

const router = Router();

// Upload payment receipt and update payment status
router
  .route("/:sessionId/receipts")
  .post(
    fileUpload(),
    validateFileUpload,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const sessionId = req.params.sessionId;
        if (!isValidObjectId(sessionId))
          throw new ApiError(400, "Not a valid session ID");

        const gameSession = await GameSessions.findOne({
          _id: new ObjectId(sessionId),
        });

        if (!gameSession)
          throw new ApiError(404, "Session with that id does not exist");

        const room = await Rooms.findOne({
          _id: new ObjectId(gameSession.roomId),
        });

        if (!room!.playerList.includes(req.user.email))
          throw new ApiError(403, "You are not a part of this room");

        const gameSessionResult = await GameSessions.findOneAndUpdate(
          {
            _id: new ObjectId(req.params.sessionId),
            players: {
              $elemMatch: {
                userEmail: req.user.email,
                paidAt: null,
                paid: false,
              },
            },
          },
          {
            $set: {
              "players.$.paid": true,
              "players.$.paidAt": new Date(),
              "players.$.fileExt": req.fileExt,
            },
          },
          { returnDocument: "after" }
        );

        if (gameSessionResult.value === null)
          throw new ApiError(
            409,
            "Either already paid for this session or not in session"
          );

        const modified = gameSessionResult.value.players?.find(
          (user) => user.userEmail === req.user.email
        );

        // Upload files to S3
        const filename = `${room!._id}/${gameSessionResult.value._id}/${
          req.user.username
        }.${req.fileExt}`; // roomId/sessionId/username.fileExt

        const bucketParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: filename,
          Body: req.file.data,
        };
        const data = await s3.send(new PutObjectCommand(bucketParams));

        // Rollback db write if s3 upload fails
        if (data.$metadata.httpStatusCode !== 200) {
          await GameSessions.updateOne(
            {
              _id: new ObjectId(req.body.sessionId),
              players: { userEmail: req.user.email },
            },
            {
              $set: { "players.$.paid": false },
              $unset: { "players.$.paidAt": "" },
            }
          );
          throw new Error("Could not upload to S3");
        }
        res.status(201).json({ result: modified });
        next();
      } catch (error) {
        next(error);
      }
    }
  )
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get session
      const sessionId = req.params.sessionId;
      if (!isValidObjectId(sessionId))
        throw new ApiError(400, "Not a valid session ID");

      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
      });
      if (!gameSession)
        throw new ApiError(404, "Session with that id does not exist");

      // Check if requester is admin of the room
      const room = await Rooms.findOne({
        _id: new ObjectId(gameSession.roomId),
      });
      if (!room!.playerList.includes(req.user.email))
        throw new ApiError(403, "You are not a part of this room");

      // Get only players that paid for that session
      const players = gameSession.players.filter((player) => {
        return player.paid === true && player.paidAt !== null;
      });

      // Ensure there are players that paid
      if (players.length === 0)
        throw new ApiError(404, "No players have paid for that session");

      // Construct promises to fetch files
      const promises = players.map((player) => {
        const filename = `${room!._id}/${gameSession._id}/${player.username}.${
          player.fileExt
        }`; // roomId/sessionId/username.fileExt
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `${room!._id}/${gameSession._id}/${player.username}.${
            player.fileExt
          }`,
        });
        return getSignedUrl(s3, command, { expiresIn: 3600 });
      });

      // Get presigned urls asynchronously
      const urls = await Promise.all(promises);

      // Parse filenames from URLs
      const urlObjs = urls.map((signedUrl) => {
        const url = new URL(signedUrl);
        const pathname = url.pathname;
        const decodedPath = decodeURIComponent(pathname);
        const usernameFileExt = decodedPath.split("/")[2];
        const username = usernameFileExt.split(".")[0];
        const fileExt = usernameFileExt.split(".")[1];
        return { payer: username, signedUrl, fileExt };
      });

      res.status(200).json({ signedUrls: urlObjs });
      next();
    } catch (err) {
      next(err);
    }
  });

export default router;
