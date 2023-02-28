import { Request, Response, NextFunction } from "express";
import * as argon2 from "argon2";
import { JsonWebTokenError } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/functions";
import { Users } from "../db/collections";

import log from "../utils/logger";
import { ApiError } from "../utils/error-util";

const excludedPaths = [
  "/healthcheck",
  "/g-auth",
  "/auth/signin",
  "/auth/refreshToken",
];

// JWT Auth
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (excludedPaths.includes(req.path)) return next();
    if (req.path === "/users" && req.method === "POST") return next();
    if (!req.headers.authorization) return res.sendStatus(401);
    const token = req.headers.authorization?.split(" ")[1]; // Expects { Authorization: Bearer TOKEN } format

    if (!token) return res.status(401);

    const decodedUser = verifyAccessToken(token);

    const found = await Users.findOne({ email: decodedUser.email });

    if (!found) return res.status(404).json({ error: "Invalid JWT" });

    if (!found.accessToken)
      return res.status(401).json({ error: "Please sign in first." });

    if (!(await argon2.verify(found.accessToken, token)))
      return res.sendStatus(401);

    // Remove tokens for safety
    delete found.accessToken;
    delete found.refreshToken;

    req.user = found;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      throw new ApiError(401, "Invalid JWT signature");
    next(error);
  }
};

export default authenticate;
