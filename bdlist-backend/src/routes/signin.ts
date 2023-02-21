import { Request, Response, Router } from "express";
import * as argon2 from "argon2";
import { Users } from "../db/collections";
import log from "../utils/logger";
import gauth from "../middleware/g-auth.middleware";
import jwt from "jsonwebtoken";

const router = Router();

// Get Shuttleday JWT
router.post("/", async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const accessToken = jwt.sign(
      { userEmail },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    const refreshToken = jwt.sign(
      { userEmail },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "120d" }
    );

    const found = await Users.updateOne(
      { email: userEmail },
      {
        $set: {
          accessToken: await argon2.hash(accessToken),
          refreshToken: await argon2.hash(refreshToken),
        },
      }
    );

    if (found.modifiedCount === 0)
      return res.status(404).json({ error: "No user with that email" });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
});

export default router;
