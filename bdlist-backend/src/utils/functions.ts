import { Request } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { OAuth2Client } from "google-auth-library";
import fileUpload, { UploadedFile } from "express-fileupload";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import { Rooms, Users } from "../db/collections.js";
import { RoomPlayer, User } from "../db/interfaces.js";
import { ApiError } from "./error-util.js";
import { ObjectId } from "mongodb";
dotenv.config();

const CLIENT_ID = process.env.G_AUTH_CLIENT_ID;
const MAX_LIMIT = 10;

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

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token!,
      aud: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  }

  const payload = verify().catch(() => {
    throw new ApiError(400, "Invalid Google JWT");
  });

  return payload;
}

export function validateDates(req: Request) {
  // Filter ListObjects by date
  const fromDate: Date = req.query.fromDate
    ? new Date(req.query.fromDate as string)
    : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  const toDate: Date = req.query.toDate
    ? new Date(req.query.toDate as string)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead

  if (toDate < fromDate)
    throw new ApiError(400, "toDate cannot be before fromDate");
  return { fromDate, toDate };
}

export function validateLimitOffset(req: Request) {
  const limitInput = parseInt(req.query.limit as string);
  const offsetInput = parseInt(req.query.offset as string);

  const inputs = [limitInput, offsetInput];
  for (const input of inputs) {
    if (input < 0)
      throw new ApiError(
        400,
        "Limit and offset must be greater than or equal to 0"
      );
    if (isNaN(input))
      throw new ApiError(400, "Limit and offset must be integers");
  }
  const limitValue: number = Math.min(limitInput, MAX_LIMIT);
  const offsetValue: number = offsetInput;

  return { limitValue, offsetValue };
}

export function genAccessToken(userObj: User) {
  return jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30d",
  });
}

export function genRefreshToken(userObj: User) {
  return jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "180d",
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as jwt.JwtPayload;
  } catch (e) {
    throw new ApiError(401, "Invalid JWT");
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;
  } catch (e) {
    throw new ApiError(401, "Invalid JWT");
  }
}

// Check if user with that email already exists
export async function userExists(email: string) {
  const userExists = await Users.findOne({ email });
  return userExists !== null;
}

export function isValidObjectId(str: string) {
  return ObjectId.isValid(str);
}

// Checks if an email is in a list of RoomPlayers
export function isEmailInPlayerList(
  playerList: RoomPlayer[],
  email: string
): Boolean {
  const isRequesterInPlayerList = playerList.some((obj) =>
    Object.values(obj).includes(email)
  );
  return isRequesterInPlayerList;
}

// Checks if an email is the admin of a room
export async function isAdminByEmail(
  roomId: string,
  email: string
): Promise<Boolean> {
  const isAdminRequester = await Rooms.findOne({
    _id: new ObjectId(roomId),
    playerList: { $elemMatch: { email: email, isAdmin: true } },
  });
  return isAdminRequester !== null;
}
