import { NextFunction, Request, Response, Router } from "express";
import { ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, validateDates } from "../utils/functions";
import { adminCheck } from "../middleware/validateRequest";

const router = Router();

router.get(
  "/",
  adminCheck,
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);

export default router;
