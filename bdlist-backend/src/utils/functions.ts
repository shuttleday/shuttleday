import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import fileUpload, { UploadedFile } from "express-fileupload";
dotenv.config();

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export function addPrefix(endpoint: string) {
  return `/api/${endpoint}`;
}

export function processUploadedFiles(uploadedFiles: fileUpload.FileArray) {
  return uploadedFiles[Object.keys(uploadedFiles)[0]] as UploadedFile;
}
