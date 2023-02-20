import { Request, Response, NextFunction } from "express";
import { Users } from "../db/collections";
import { processUploadedFiles } from "../utils/functions";
import { requiredBody } from "./validation";
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export async function validateNewGameSessionDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionDate = new Date(req.body.date);
  if (sessionDate < new Date())
    return res.status(400).json({ error: "Cannot create session in the past" });

  return next();
}

export async function adminCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.ctx.user.userType !== "admin")
    res
      .status(403)
      .json({ error: "You must be an admin to access this resource" });
  next();
}

export function validateFileUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.files)
    return res.status(401).json({ error: "No image was uploaded" });

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
    res.status(409).json({ error: "User with that email already exists" });

  next();
}

export async function validateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Return early if a GET method
  if (req.method === "GET") return next();

  // Get required req.body keys
  const required = Object.entries(requiredBody);

  const tmp = required.find((path) => path[0] === req.path);

  if (!tmp) return next(); // Return early if there are no targets
  const target = tmp[1];

  // Get supplied req.body keys
  const supplied = Object.keys(req.body);

  // Check if all target keys are in supplied keys
  const missing: string[] = [];
  target.forEach((reqKey) => {
    if (!supplied.includes(reqKey)) missing.push(reqKey);
  });

  // Return 400 with dynamic error message if there are missing keys
  if (missing.length > 0) {
    let missingKeys = "";
    missing.forEach((word, index) => {
      if (index !== missing.length - 1) missingKeys = `${missingKeys} ${word},`;
      else missingKeys = `${missingKeys} ${word}`;
    });
    return res.status(400).json({ error: `Missing keys:${missingKeys}` });
  }

  next();
}

// For future use
// export async function validateQuery(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   // Return early if not a GET method
//   if (req.method !== "GET") return next();

//   // Get required req.body keys
//   const required = Object.entries(requiredQuery);

//   const tmp = required.find((path) => path[0] === req.path);

//   if (!tmp) return next(); // Return early if there are no targets
//   const target = tmp[1];

//   // Get supplied req.body keys
//   const supplied = Object.keys(req.query);

//   // Check if all target keys are in supplied keys
//   const missing: string[] = [];
//   target.forEach((reqKey) => {
//     if (!supplied.includes(reqKey)) missing.push(reqKey);
//   });

//   // Return 400 with dynamic error message if there are missing keys
//   if (missing.length > 0) {
//     let missingKeys = "";
//     missing.forEach((word, index) => {
//       if (index !== missing.length - 1) missingKeys = `${missingKeys} ${word},`;
//       else missingKeys = `${missingKeys} ${word}`;
//     });
//     return res.status(400).json({ error: `Missing keys:${missingKeys}` });
//   }

//   next();
// }
