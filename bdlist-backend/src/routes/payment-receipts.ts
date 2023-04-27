import { NextFunction, Request, Response, Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../utils/functions.js";
import { adminCheck } from "../middleware/validateRequest.js";
import { GameSessions } from "../db/collections.js";
import { ObjectId } from "mongodb";
import { ApiError } from "../utils/error-util.js";

const router = Router();

router.get(
  "/",
  adminCheck,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get session
      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(req.query.sessionId as string),
      });

      if (!gameSession) throw new ApiError(404, "No session with that ID");

      // Get only players that paid for that session
      const players = gameSession.players.filter((player) => {
        return player.paid === true && player.paidAt !== null;
      });

      // Ensure there are players that paid
      if (players.length === 0)
        throw new ApiError(404, "No players have paid for that session");

      // Construct promises to fetch files
      const promises = players.map((player) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `${gameSession._id}/${player.username}.${player.fileExt}`,
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
  }
);

export default router;
