import { Request, Response } from "express";

import log from "../utils/logger";

const requestLogger = async (req: Request, res: Response) => {
  log.info({ res });
};

export default requestLogger;
