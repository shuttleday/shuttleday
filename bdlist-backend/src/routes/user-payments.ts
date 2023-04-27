import { NextFunction, Request, Response, Router } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import fileUpload from "express-fileupload";
import { processUploadedFiles, s3 } from "../utils/functions.js";
import { GameSessions } from "../db/collections.js";
import {
  fileSizeLimiter,
  validateFileUpload,
} from "../middleware/validateRequest.js";
import { ApiError } from "../utils/error-util.js";

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

      if (result.value === null)
        throw new ApiError(
          409,
          "Either already paid for this session or not in session"
        );

      const modified = result.value.players?.find(
        (user) => user.userEmail === req.user.email
      );

      // Upload files to S3
      const file = processUploadedFiles(req.files!);
      const filename = `${result.value._id}/${req.user.username}.${req.fileExt}`; // sessionId/username.fileExt

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
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
