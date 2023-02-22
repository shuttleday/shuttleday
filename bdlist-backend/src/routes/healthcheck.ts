import { Router, Request, Response } from "express";

const router = Router();

// Healthcheck for API service
router.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
