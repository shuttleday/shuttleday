import { Express, Request, Response } from "express";
import {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ObjectId } from "mongodb";
import fileUpload from "express-fileupload";
import { processUploadedFiles, s3, validateDates } from "./utils/functions";
import { GameSessions } from "./db/collections";
import {
  adminCheck,
  fileSizeLimiter,
  validateFileUpload,
} from "./middleware/validateRequest";
import log from "./utils/logger";
import gameSessionsRouter from "./routes/game-sessions";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";

export default function (app: Express) {
  // Healthcheck for API service
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/game-sessions", gameSessionsRouter);

  app
    .route("/session-players")
    // Add player to game session
    .post(async (req: Request, res: Response) => {
      try {
        const result = await GameSessions.updateOne(
          { _id: new ObjectId(req.body.sessionId) },
          {
            $push: {
              players: {
                userEmail: req.body.userEmail,
                paid: false,
                paidAt: undefined,
              },
            },
          }
        );

        res.status(200).json({ result });
      } catch (error) {
        log.error(req, error);
        res.sendStatus(500);
      }
    })
    // Remove player from game session
    .delete(async (req: Request, res: Response) => {
      try {
        const result = await GameSessions.updateOne(
          {
            _id: new ObjectId(req.body.sessionId),
            "players.userEmail": req.body.userEmail,
          },
          {
            $pull: {
              players: {
                userEmail: req.body.userEmail,
              },
            },
          }
        );

        res.status(200).json({ result });
      } catch (error) {
        log.error(req, error);
        res.sendStatus(500);
      }
    });

  // Update user payment status
  app.post(
    "/user-payments",
    fileUpload(),
    validateFileUpload,
    fileSizeLimiter,
    async (req: Request, res: Response) => {
      try {
        // Verify sessionId
        const gameSession = await GameSessions.findOne({
          _id: new ObjectId(req.body.sessionId),
        });

        if (!gameSession)
          return res
            .status(400)
            .json({ error: "That session does not exist." });

        // Upload files to S3
        const file = processUploadedFiles(req.files!);
        const bucketParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: `${gameSession.start.toUTCString()}-${req.ctx.user.username}.${
            file.name.split(".")[1]
          }`,
          Body: file.data,
        };
        const data = await s3.send(new PutObjectCommand(bucketParams));

        const result = await GameSessions.updateOne(
          {
            _id: new ObjectId(req.body.sessionId),
            "players.userEmail": req.body.playerEmail,
            "players.paidAt": { $eq: null }, // prevents overwrites if already paid
          },
          {
            $set: {
              "players.$.paid": true,
              "players.$.paidAt": new Date(),
            },
          }
        );

        res.status(200).json({ result });
      } catch (error) {
        log.error(req, error);
        res.sendStatus(500);
      }
    }
  );

  app.get(
    "/payment-receipts",
    adminCheck,
    async (req: Request, res: Response) => {
      try {
        // Fetch first 1000 objects in S3
        const bucketParams = { Bucket: process.env.AWS_S3_BUCKET_NAME };
        const getListObjects = async () => {
          const data = await s3.send(new ListObjectsCommand(bucketParams));
          if (data.$metadata.httpStatusCode === 200) return data.Contents;
        };
        const objects = await getListObjects();

        // Filter ListObjects by date
        const { fromDate, toDate } = validateDates(req);

        const filteredObjects = objects?.filter((obj) => {
          return fromDate <= obj.LastModified! && obj.LastModified! <= toDate;
        });

        // Get signed URLs for public view
        const signedUrls = [];

        for (const obj of filteredObjects!) {
          const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: obj.Key,
          });
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          signedUrls.push({ key: obj.Key, signedUrl: url });
        }
        res.status(200).json({ signedUrls });
      } catch (err) {
        log.error(req, err);
        res.sendStatus(500);
      }
    }
  );
}
