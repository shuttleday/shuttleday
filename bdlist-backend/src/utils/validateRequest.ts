import { Request, Response, NextFunction } from "express";

export async function validateNewGameSessionDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.sessionDate)
    return res.status(400).json({ error: "Missing session date." });

  const sessionDate = new Date(req.body.date);
  if (sessionDate < new Date())
    return res
      .status(400)
      .json({ error: "Cannot create session before current time." });

  return next();
}
