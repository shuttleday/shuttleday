import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { Users } from "../db/collections";
import * as dotenv from "dotenv";
dotenv.config();
const CLIENT_ID = process.env.G_AUTH_CLIENT_ID;
import log from "../utils/logger";

const client = new OAuth2Client(CLIENT_ID);

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.path === "/healthcheck") return next();
    const token = req.headers.authorization?.split(" ")[1]; // Expects { authorization: Bearer TOKEN } format
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token!,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await Users.findOne({ email: payload!.email });

      if (!user)
        return res.status(404).json({ error: "That user does not exist." });

      req.ctx.user = user;
    }
    verify()
      .then(() => next())
      .catch((err) => {
        log.error(err);
        return res.sendStatus(403);
      });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};

export default authenticate;
