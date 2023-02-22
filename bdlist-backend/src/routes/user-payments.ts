import { NextFunction, Request, Response, Router } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import fileUpload from "express-fileupload";
import { processUploadedFiles, s3 } from "../utils/functions";
import { GameSessions } from "../db/collections";
import {
  fileSizeLimiter,
  validateFileUpload,
} from "../middleware/validateRequest";

const router = Router();

// Update user payment status
router.post(
  "/",
  fileUpload(),
  validateFileUpload,
  fileSizeLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Verify sessionId
      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(req.body.sessionId),
        "players.userEmail": req.user.email,
      });

      if (!gameSession)
        return res
          .status(400)
          .json({ error: "No session with that id and your email" });

      // Upload files to S3
      const file = processUploadedFiles(req.files!);
      const bucketParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${gameSession.start.toUTCString()}-${req.user.username}.${
          file.name.split(".")[1]
        }`,
        Body: file.data,
      };
      const data = await s3.send(new PutObjectCommand(bucketParams));

      const result = await GameSessions.updateOne(
        {
          _id: new ObjectId(req.body.sessionId),
          "players.userEmail": req.user.email,
          "players.paidAt": { $eq: null }, // prevents overwrites if already paid
        },
        {
          $set: {
            "players.$.paid": true,
            "players.$.paidAt": new Date(),
          },
        }
      );

      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
