import { Request, Response, Router } from "express";
import * as argon2 from "argon2";
import { Users } from "../db/collections";
import log from "../utils/logger";
import gauth from "../middleware/g-auth.middleware";
import {
  genAccessToken,
  genRefreshToken,
  verifyRefreshToken,
} from "../utils/functions";

const router = Router();

// Get Shuttleday JWT
router.post("/signin", gauth, async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const accessToken = genAccessToken(userEmail);
    const refreshToken = genRefreshToken(userEmail);

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
    log.error(req, error);
    res.sendStatus(500);
  }
});

router.post("/refreshToken", async (req: Request, res: Response) => {
  try {
    const candidateToken = req.body.refreshToken;

    // Validate candidateToken
    const decoded = verifyRefreshToken(candidateToken);

    // Validate token is identical to db token
    const found = await Users.findOne({ email: decoded.userEmail });

    if (!found)
      return res.status(404).json({ error: "No user with that email" });

    if (!found.refreshToken)
      return res.status(401).json({ error: "Please sign in first." });

    if (!(await argon2.verify(found.refreshToken, candidateToken)))
      return res.sendStatus(403);

    // Return new access token
    const accessToken = genAccessToken(decoded.userEmail);

    res.status(200).json({ accessToken });
  } catch (error) {
    log.error(req, error);
    res.sendStatus(500);
  }
});

export default router;
