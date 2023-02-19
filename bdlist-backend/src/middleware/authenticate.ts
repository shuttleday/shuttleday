import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
const CLIENT_ID =
  "1068634634840-54f4f64s3pgj9vgqh26b4eseqdnvgp0v.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
import log from "../utils/logger";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    async function verify() {
      await client.verifyIdToken({
        idToken: token!,
        audience: CLIENT_ID,
      });
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
