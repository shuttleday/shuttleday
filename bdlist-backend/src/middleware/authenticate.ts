import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { Users } from "../db/collections";
import * as dotenv from "dotenv";
dotenv.config();
const CLIENT_ID = process.env.G_AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.G_AUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.G_AUTH_REDIRECT_URI;
import log from "../utils/logger";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getAuthUrl = () => {
  return client.generateAuthUrl({
    access_type: "offline",
    scope: "email",
    include_granted_scopes: true,
  });
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.path === "/healthcheck") return next();
    const token = req.headers.authorization?.split(" ")[1]; // Expects { Authorization: Bearer TOKEN } format
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token!,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await Users.findOne({ email: payload!.email });

      // Initiate OAuth2 authorization
      if (!user) return res.redirect(301, getAuthUrl());

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
