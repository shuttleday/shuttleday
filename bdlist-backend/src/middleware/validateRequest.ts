import { Request, Response, NextFunction } from "express";
import { Users } from "../db/collections";
import { processUploadedFiles } from "../utils/functions";
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export async function validateNewGameSessionDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.start)
    return res.status(400).json({ error: "Missing session start date." });

  const sessionDate = new Date(req.body.date);
  if (sessionDate < new Date())
    return res
      .status(400)
      .json({ error: "Cannot create session before current time." });

  return next();
}

export async function adminCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.ctx.user.userType !== "admin")
    res.status(403).json({ error: "You must be an admin." });
  next();
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
      .json({ error: `Uploaded file is over the file size limit of ${MB} MB` });

  next();
}

export async function checkDupeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Check if user with that email already exists
  const email = req.body.email;
  const userExists = await Users.findOne({ email });
  if (userExists)
    res.status(409).json({ error: "User with that email already exists." });

  next();
}
