import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Users } from "../db/collections";
import { User } from "../db/interfaces";
import { userExists, validateGJwt } from "../utils/functions";

const router = Router();

// Get user object from email
router.get(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const user = await Users.findOne({ email });

      if (!user)
        return res
          .status(404)
          .json({ error: "User with that email does not exist." });

      // Don't show hashed tokens
      delete user.accessToken;
      delete user.refreshToken;

      res.status(200).json(user);
      next();
    } catch (error) {
      next(error);
    }
  }
);

router
  .route("/")
  // Get all users
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await Users.find().toArray();

      // Don't show hashed tokens
      const result = response.map((user) => {
        delete user.accessToken;
        delete user.refreshToken;
        return user;
      });

      res.status(200).json({ result });
      next();
    } catch (error) {
      next(error);
    }
  })

  // Create new user
  // Only allowed if supplied with a valid Google JWT and doesn't exist
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get details of user trying to sign up
      const decoded = await validateGJwt(req);

      // Ensure user with that email doesn't already exist
      if (await userExists(decoded?.email!))
        return res
          .status(409)
          .json({ error: "User with that email already exists" });

      const document: User = {
        _id: new ObjectId(),
        email: decoded?.email!,
        firstName: decoded?.given_name!,
        lastName: decoded?.family_name!,
        username: req.body.username,
        createdAt: new Date(),
        userType: "player", // default
        accessToken: undefined,
        refreshToken: undefined,
      };

      const result = await Users.insertOne(document);
      res.status(201).json({ result, document });
      next();
    } catch (error: any) {
      if (error.message.startsWith("Invalid Google JWT"))
        return res.sendStatus(401);
      next(error);
    }
  });

export default router;
