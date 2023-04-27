import { NextFunction, Request, Response, Router } from "express";
import { ApiError } from "../utils/error-util.js";
import {
  adminCheck,
  validateFileUpload,
} from "../middleware/validateRequest.js";
import fileUpload from "express-fileupload";
import { s3 } from "../utils/functions.js";
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Users } from "../db/collections.js";

const router = Router();
// /admins

router
  .route("/qr/:email") // Get QR code by email
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const result = await Users.findOne({ email });
      if (!result) throw new ApiError(404, "No user with that email");

      if (!result.QR.uploaded)
        throw new ApiError(404, "No QR has been uploaded");

      const fileExt = result.QR.fileExt;
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${req.user.email}-QR.${fileExt}`,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

      res.status(200).json({ url, fileExt });
      next();
    } catch (error) {
      next(error);
    }
  });

router
  .route("/qr")
  // Create QR code
  .post(
    adminCheck,
    fileUpload(),
    validateFileUpload,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await Users.findOne({ email: req.user.email });
        if (!result) throw new ApiError(404, "No user with that email");

        if (result.QR.uploaded)
          throw new ApiError(409, "You have already uploaded a QR");

        const filename = `${req.user.email}-QR.${req.fileExt}`; // some@email.com-QR.fileType

        const bucketParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: filename,
          Body: req.file.data,
        };

        const data = await s3.send(new PutObjectCommand(bucketParams));

        if (data.$metadata.httpStatusCode !== 200)
          throw new Error("Could not upload to S3");

        const result2 = await Users.findOneAndUpdate(
          { email: req.user.email },
          {
            $set: {
              QR: {
                uploaded: true,
                fileExt: req.fileExt,
              },
            },
          },
          { returnDocument: "after" }
        );

        if (!result2.ok) throw new ApiError(500, "Internal server error");

        res.status(201).json(result2.value);
        next();
      } catch (error) {
        next(error);
      }
    }
  )
  // Update QR code
  .patch(
    adminCheck,
    fileUpload(),
    validateFileUpload,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await Users.findOne({ email: req.user.email });
        if (!result) throw new ApiError(404, "No user with that email");

        if (!result.QR.uploaded)
          throw new ApiError(404, "You have not uploaded a QR yet");

        const fileExt = result.QR.fileExt;
        const filename = `${req.user.email}-QR.${fileExt}`;

        const bucketParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: filename,
          Body: req.file.data,
        };

        const data = await s3.send(new PutObjectCommand(bucketParams));

        if (data.$metadata.httpStatusCode !== 200)
          throw new Error("Could not upload to S3");

        res.status(201).json({ filename, fileExt });
        next();
      } catch (error) {
        next(error);
      }
    }
  )
  .delete(
    adminCheck,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await Users.findOne({ email: req.user.email });
        if (!result) throw new ApiError(404, "No user with that email");

        if (!result.QR.uploaded)
          throw new ApiError(404, "You have not uploaded a QR yet");

        const bucketParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: `${req.user.email}-QR.${req.fileExt}`,
        };

        const data = await s3.send(new DeleteObjectCommand(bucketParams));

        if (data.$metadata.httpStatusCode !== 204)
          throw new Error("Could not delete object from S3");

        const result2 = await Users.findOneAndUpdate(
          { email: req.user.email },
          { $set: { QR: { uploaded: false, fileExt: null } } },
          { returnDocument: "after" }
        );

        if (!result2.ok) throw new ApiError(500, "Internal server error");

        res.status(200).json(result2);
        next();
      } catch (error) {
        next(error);
      }
    }
  );

export default router;
