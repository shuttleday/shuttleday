import { Router, Request, Response, NextFunction } from "express";

const router = Router();

// Healthcheck for API service
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // Must be sendStatus or else it breaks the route.
  res.sendStatus(200);
  next();
});

export default router;
