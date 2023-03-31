import { NextFunction, Request, Response, Router } from "express";
import { Users } from "../db/collections";
import {
  genAccessToken,
  genRefreshToken,
  validateGJwt,
  verifyRefreshToken,
  userExists,
} from "../utils/functions";
import { ApiError } from "../utils/error-util";
import { validatePOST } from "../middleware/validateRequest";
import { ObjectId } from "mongodb";
import { User } from "../db/interfaces";

const router = Router();

router.post(
  "/register",
  validatePOST,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get details of user trying to sign up
      const decoded = await validateGJwt(req);

      // Ensure user with that email doesn't already exist
      if (await userExists(decoded?.email!))
        throw new ApiError(409, "User with that email already exists");

      const document: User = {
        _id: new ObjectId(),
        email: decoded?.email!,
        firstName: decoded?.given_name!,
        lastName: decoded?.family_name!,
        username: req.body.username,
        createdAt: new Date(),
        userType: "player", // default
      };

      await Users.insertOne(document);

      const accessToken = genAccessToken(document);
      const refreshToken = genRefreshToken(document);

      res.status(201).json({ user: document, accessToken, refreshToken });
      next();
    } catch (error: any) {
      if (error.message.startsWith("Invalid Google JWT"))
        return res.sendStatus(401);
      next(error);
    }
  }
);
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

      res.status(201).json({ accessToken, refreshToken });
      next();
    } catch (error: any) {
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

      // Generate new access token
      const newAccessToken = genAccessToken(found);

      // Return new access token
      res.status(201).json({ accessToken: newAccessToken });
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
