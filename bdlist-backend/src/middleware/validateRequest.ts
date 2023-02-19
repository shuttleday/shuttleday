import { Request, Response, NextFunction } from "express";
import { processUploadedFiles } from "../utils/functions";
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export async function validateNewGameSessionDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.date)
    return res.status(400).json({ error: "Missing session date." });

  const sessionDate = new Date(req.body.date);
  if (sessionDate < new Date())
    return res
      .status(400)
      .json({ error: "Cannot create session before current time." });

  return next();
}

export function validateFileUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.files)
    return res.status(401).json({ error: "No image was uploaded." });

  next();
}

export function fileSizeLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const file = processUploadedFiles(req.files!);

  if (file.size > FILE_SIZE_LIMIT)
    return res
      .status(413)
      .json({ error: `Uploaded file is over the file size limit of ${MB} Mb` });

  next();
}
