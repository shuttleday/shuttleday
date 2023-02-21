import { Request } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { OAuth2Client } from "google-auth-library";
import fileUpload, { UploadedFile } from "express-fileupload";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.G_AUTH_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

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

export async function validateGJwt(req: Request) {
  const token = req.headers.authorization?.split(" ")[1]; // Expects { Authorization: Bearer TOKEN } format
  const ticket = await client.verifyIdToken({
    idToken: token!,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return payload;
}

export function validateDates(req: Request) {
  // Filter ListObjects by date
  const fromDate: Date = req.query.fromDate
    ? new Date(req.query.fromDate as string)
    : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  const toDate: Date = req.query.toDate
    ? new Date(req.query.toDate as string)
    : new Date(); // current date

  return { fromDate, toDate };
}

export function genAccessToken(userEmail: string) {
  return jwt.sign({ userEmail }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
}

export function genRefreshToken(userEmail: string) {
  return jwt.sign({ userEmail }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "120d",
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;
}
