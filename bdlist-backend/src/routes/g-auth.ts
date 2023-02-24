import { NextFunction, Request, Response, Router } from "express";
import { validateGJwt } from "../utils/functions";
import log from "../utils/logger";

const router = Router();

// Endpoint to validate Google JWT
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    validateGJwt(req)
      .then((payload) => res.status(200).json({ payload }))
      .catch((err) => {
        log.error(err);
        return res.sendStatus(401);
      });
  } catch (error) {
    next(error);
  }
});

export default router;
