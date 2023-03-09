import { NextFunction, Request, Response, Router } from "express";
import * as argon2 from "argon2";
import { Users } from "../db/collections";
import {
  genAccessToken,
  genRefreshToken,
  validateGJwt,
  verifyRefreshToken,
} from "../utils/functions";
import { ApiError } from "../utils/error-util";
import { validatePOST } from "../middleware/validateRequest";

const router = Router();

// Get Shuttleday JWT
router.post(
  "/signin",
  validatePOST,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and get email from G JWT
      const decoded = await validateGJwt(req);
      const userEmail = decoded?.email!;

      // Get user information in JWT
      const result = await Users.findOne({ email: userEmail });

      if (!result) throw new ApiError(404, "No user with that email");

      const accessToken = genAccessToken(result);
      const refreshToken = genRefreshToken(result);

      // Update db with latest hashed tokens
      await Users.updateOne(
        { email: userEmail },
        {
          $set: {
            accessToken: await argon2.hash(accessToken),
            refreshToken: await argon2.hash(refreshToken),
          },
        }
      );

      res.status(201).json({ accessToken, refreshToken });
      next();
    } catch (error: any) {
      if (error.message.startsWith("Invalid Google JWT"))
        return res.status(401).json({ error: "Invalid Google JWT" });
      next(error);
    }
  }
);

// Get new access token from refresh token
// Updates db with new hash
router.post(
  "/refreshToken",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const candidateToken = req.body.refreshToken;

      // Validate candidateToken
      const decoded = verifyRefreshToken(candidateToken);
      const userEmail = decoded.email;

      // Check if user exists
      const found = await Users.findOne({ email: userEmail });

      if (!found) throw new ApiError(404, "No user with that email");

      if (!found.refreshToken) throw new ApiError(404, "Please sign in first");

      // Validate token is identical to db token
      if (!(await argon2.verify(found.refreshToken, candidateToken)))
        return res.sendStatus(401);

      // Generate new access token
      const newAccessToken = genAccessToken(found);

      // Save new access token to db
      const result = await Users.updateOne(
        { email: userEmail },
        { $set: { accessToken: await argon2.hash(newAccessToken) } }
      );

      if (result.modifiedCount === 0) throw new Error();

      // Return new access token
      res.status(201).json({ accessToken: newAccessToken });
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
