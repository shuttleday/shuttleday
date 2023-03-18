import { Request, Response, NextFunction } from "express";
import { processUploadedFiles } from "utils/functions";
import {
  requiredPOST,
  requiredGET,
  requiredPATCH,
  requiredMETHOD,
} from "./validation";
import { ApiError } from "utils/error-util";
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export async function validateNewGameSessionDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionDate = new Date(req.body.date);
    if (sessionDate < new Date())
      throw new ApiError(400, "Cannot create session in the past");

    next();
  } catch (error) {
    next(error);
  }
}

export async function adminCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user.userType !== "admin")
      throw new ApiError(403, "You must be an admin to access this resource");

    next();
  } catch (error) {
    next(error);
  }
}

export function validateFileUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.files) throw new ApiError(401, "No image was uploaded");

    next();
  } catch (error) {
    next(error);
  }
}

export function fileSizeLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = processUploadedFiles(req.files!);

    if (file.size > FILE_SIZE_LIMIT)
      throw new ApiError(
        413,
        `Uploaded file is over the file size limit of ${MB} MB`
      );

    next();
  } catch (error) {
    next(error);
  }
}

type ValidateMethod = "POST" | "GET" | "PATCH";

async function validateMethod(
  method: ValidateMethod,
  requiredKeys: requiredMETHOD,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Return early if not the expected method
    if (req.method !== method) return next();

    // Get required keys
    const target = getTargetKeys(requiredKeys, req);
    if (!target) return next(); // Return early if there are no targets

    // Get missing keys
    const missing: string[] = getMissingKeys(target[1], req);

    // Return 400 with dynamic error message if there are missing keys
    if (missing.length > 0) throwMissingKeysError(missing);

    next();
  } catch (error) {
    next(error);
  }
}

export async function validatePOST(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await validateMethod("POST", requiredPOST, req, res, next);
}

export async function validateGET(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await validateMethod("GET", requiredGET, req, res, next);
}

export async function validatePATCH(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await validateMethod("PATCH", requiredPATCH, req, res, next);
}

function throwMissingKeysError(missing: string[]) {
  const missingKeys = formatError(missing);
  throw new ApiError(400, `Missing keys:${missingKeys}`);
}

function getTargetKeys(requiredKeys: { [s: string]: string[] }, req: Request) {
  // Get required req.query keys
  const required = Object.entries(requiredKeys);

  let endpoint: string;
  switch (req.method) {
    case "GET":
      endpoint = req.baseUrl;
      break;
    default:
      endpoint = req.path;
      break;
  }
  return required.find((path) => path[0] === endpoint);
}

function formatError(missing: string[]) {
  let missingKeys = "";
  missing.forEach((word, index) => {
    if (index !== missing.length - 1) missingKeys = `${missingKeys} ${word},`;
    else missingKeys = `${missingKeys} ${word}`;
  });
  return missingKeys;
}

function getMissingKeys(target: string[], req: Request) {
  const supplied = Object.keys(req.body);
  const missing: string[] = [];
  target.forEach((reqKey) => {
    if (!supplied.includes(reqKey)) missing.push(reqKey);
  });
  return missing;
}
