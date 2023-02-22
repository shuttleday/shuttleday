import { Request, Response, Router } from "express";
import * as argon2 from "argon2";
import { Users } from "../db/collections";
import log from "../utils/logger";
import {
  genAccessToken,
  genRefreshToken,
  validateGJwt,
  verifyRefreshToken,
} from "../utils/functions";

const router = Router();

// Get Shuttleday JWT
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const decoded = await validateGJwt(req);

    const userEmail = decoded?.email!;
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
  } catch (error: any) {
    log.error(error);
    if (error.message.startsWith("Invalid Google JWT"))
      return res.sendStatus(401);
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
      return res.status(401).json({ error: "Please sign in first" });

    if (!(await argon2.verify(found.refreshToken, candidateToken)))
      return res.sendStatus(403);

    // Generate new access token
    const newAccessToken = genAccessToken(decoded.userEmail);

    // Save new access token to db
    const result = await Users.updateOne(
      { email: decoded.userEmail },
      { $set: { accessToken: await argon2.hash(newAccessToken) } }
    );

    if (result.modifiedCount === 0) res.sendStatus(500);

    // Return new access token
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    log.error(req, error);
    res.sendStatus(500);
  }
});

export default router;
