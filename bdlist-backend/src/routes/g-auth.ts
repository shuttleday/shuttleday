import { Request, Response, Router } from "express";
import { validateGJwt } from "../utils/functions";
import log from "../utils/logger";

const router = Router();

// Endpoint to validate Google JWT
router.get("/", (req: Request, res: Response) => {
  try {
    validateGJwt(req)
      .then((payload) => res.status(200).json({ payload }))
      .catch((err) => {
        log.error(err);
        return res.sendStatus(401);
      });
  } catch (error) {
    log.error(req, error);
    res.sendStatus(500);
  }
});

export default router;
