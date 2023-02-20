import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Users } from "../db/collections";
import { User } from "../db/interfaces";
import log from "../utils/logger";

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

// Create new user
router.post("/", async (req: Request, res: Response) => {
  const email = req.body.email;

  try {
    // Check if user with that email already exists
    const userExists = await Users.findOne({ email });
    if (userExists)
      res.status(409).json({ error: "User with that email already exists." });

    const document: User = {
      _id: new ObjectId(),
      email,
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
