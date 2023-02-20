import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Users } from "../db/collections";
import { User } from "../db/interfaces";
import log from "../utils/logger";
import { checkDupeUser } from "../middleware/validateRequest";

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
      const result = await Users.find().toArray();

      res.status(200).json({ result });
    } catch (error) {
      log.error(error);
      res.sendStatus(500);
    }
  })
  // Create new user
  .post(checkDupeUser, async (req: Request, res: Response) => {
    try {
      const document: User = {
        _id: new ObjectId(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        createdAt: new Date(),
        userType: "player",
      };

      const result = await Users.insertOne(document);
      res.status(200).json({ result, document });
    } catch (error) {
      log.error(error);
      res.sendStatus(500);
    }
  });

export default router;
