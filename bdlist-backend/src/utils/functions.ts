import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import fileUpload, { UploadedFile } from "express-fileupload";
dotenv.config();

const REGION = "ap-southeast-1";
export const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export function processUploadedFiles(uploadedFiles: fileUpload.FileArray) {
  return uploadedFiles[Object.keys(uploadedFiles)[0]] as UploadedFile;
}
