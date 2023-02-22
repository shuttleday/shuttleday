import { Request, Response, NextFunction } from "express";

import log from "../utils/logger";

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.error(req, err);
  res.sendStatus(500);
};

export default errorHandler;
