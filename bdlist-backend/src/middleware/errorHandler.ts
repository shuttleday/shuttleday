import { Request, Response, NextFunction } from "express";

import {
  ApiError,
  apiErrorHandler,
  throwInternalServerError,
} from "../utils/error-util.js";
import log from "../utils/logger.js";

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.error(err);
  if (err instanceof ApiError) apiErrorHandler(err, res);
  else throwInternalServerError(res);
};

export default errorHandler;
