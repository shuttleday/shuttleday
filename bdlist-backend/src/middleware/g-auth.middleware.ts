import { Request, Response, NextFunction } from "express";
import { validateGJwt } from "../utils/functions";
import log from "../utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

// Middleware to verify supplied Google JWT
const gauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path === "/healthcheck") return next();
    validateGJwt(req)
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

export default gauth;
