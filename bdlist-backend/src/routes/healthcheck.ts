import { Router, Request, Response, NextFunction } from "express";

const router = Router();

// Healthcheck for API service
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  next();
});

export default router;
