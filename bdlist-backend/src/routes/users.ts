import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Users } from "../db/collections";
import { User } from "../db/interfaces";
import log from "../utils/logger";
import { checkDupeUser } from "../middleware/validateRequest";
import gauth from "../middleware/g-auth.middleware";

const router = Router();

// Get user object from email
router.get("/:email", async (req: Request, res: Response) => {
  const email = req.params.email;

  let user;
  try {
    user = await Users.findOne({ email });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }

  if (!user)
    return res
      .status(404)
      .json({ error: "User with that email does not exist." });

  res.status(200).json(user);
});

router
  .route("/")
  // Get all users
  .get(async (req: Request, res: Response) => {
    try {
      const response = await Users.find().toArray();

      // Don't show hashed tokens
      const result = response.map((user) => {
        delete user.accessToken;
        delete user.refreshToken;
        return user;
      });

      res.status(200).json({ result });
    } catch (error) {
      log.error(error);
      res.sendStatus(500);
    }
  })
  // Create new user
  // Only allowed if supplied with a valid Google JWT
  .post(checkDupeUser, gauth, async (req: Request, res: Response) => {
    try {
      const document: User = {
        _id: new ObjectId(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        createdAt: new Date(),
        userType: "player",
        accessToken: undefined,
        refreshToken: undefined,
      };

      const result = await Users.insertOne(document);
      res.status(200).json({ result, document });
    } catch (error) {
      log.error(error);
      res.sendStatus(500);
    }
  });

export default router;
