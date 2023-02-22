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

// Upload payment receipt and update payment status
router.post(
  "/",
  fileUpload(),
  validateFileUpload,
  fileSizeLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await GameSessions.findOneAndUpdate(
        {
          _id: new ObjectId(req.body.sessionId),
          players: { userEmail: req.user.email, paid: false, paidAt: null },
        },
        {
          $set: {
            "players.$.paid": true,
            "players.$.paidAt": new Date(),
          },
        },
        { returnDocument: "after" }
      );

      if (result.value === null)
        return res.status(409).json({
          error: "Either already paid for this session or not in session",
        });

      const modified = result.value.players?.find(
        (user) => user.userEmail === req.user.email
      );

      // Upload files to S3
      const file = processUploadedFiles(req.files!);
      const filename = `${result.value.start.toUTCString()}-${
        req.user.username
      }.${file.name.split(".")[1]}`;

      const bucketParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: filename,
        Body: file.data,
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
    } catch (error) {
      next(error);
    }
  }
);

export default router;
