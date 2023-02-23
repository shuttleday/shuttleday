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
      const { fromDate, toDate } = validateDates(req);

      // Fetch first 1000 objects in S3
      const bucketParams = { Bucket: process.env.AWS_S3_BUCKET_NAME };
      const getListObjects = async () => {
        const data = await s3.send(new ListObjectsCommand(bucketParams));
        if (data.$metadata.httpStatusCode === 200) return data.Contents;
      };
      const objects = await getListObjects();

      // Filter ListObjects by date
      const filteredObjects = objects?.filter((obj) => {
        return fromDate <= obj.LastModified! && obj.LastModified! <= toDate;
      });

      // Exit early if no match
      if (!filteredObjects) return res.status(200).json({ signedUrls: [] });

      // Construct promises
      const promises = filteredObjects.map((obj) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: obj.Key,
        });
        return getSignedUrl(s3, command, { expiresIn: 3600 });
      });

      // Get urls asynchronously
      const urls = await Promise.all(promises);

      // Parse key names from URLs
      const urlObjs = urls.map((signedUrl) => {
        const filename = decodeURIComponent(new URL(signedUrl).pathname).slice(
          1
        );
        return { key: filename, signedUrl };
      });

      res.status(200).json({ signedUrls: urlObjs });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
