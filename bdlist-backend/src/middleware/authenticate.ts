import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/functions";
import { ApiError } from "../utils/error-util";
import { User } from "../db/interfaces";

const excludedPaths = [
  "/healthcheck",
  "/g-auth",
  "/auth/signin",
  "/auth/refreshToken",
  "/auth/register",
];

// JWT Auth
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (excludedPaths.includes(req.path)) return next();
    if (!req.headers.authorization) throw new ApiError(400, "No JWT provided");

    const token = req.headers.authorization?.split(" ")[1]; // Expects { Authorization: Bearer TOKEN } format

    if (!token) throw new ApiError(400, "No JWT provided");

    const decodedUser = verifyAccessToken(token);

    const currentUser: User = {
      _id: decodedUser._id,
      email: decodedUser.email,
      firstName: decodedUser.firstName,
      lastName: decodedUser.lastName,
      username: decodedUser.username,
      createdAt: decodedUser.createdAt,
      userType: decodedUser.userType,
    };
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};
