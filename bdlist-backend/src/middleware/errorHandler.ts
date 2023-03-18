import { Request, Response, NextFunction } from "express";

import {
  ApiError,
  apiErrorHandler,
  throwInternalServerError,
} from "utils/error-util";
import log from "utils/logger";

const errorHandler = async (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.error({ req, err });
  if (err instanceof ApiError) apiErrorHandler(err, res);
  else throwInternalServerError(res);
};

export default errorHandler;
