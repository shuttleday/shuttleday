import { Router, Request, Response, NextFunction } from "express";
import version from "../version.json";

const router = Router();

// Healthcheck for API service
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(version);
  next();
});

export default router;
