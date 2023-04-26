import { NextFunction, Request, Response, Router } from "express";
import { Users } from "../db/collections.js";
import { ApiError } from "../utils/error-util.js";
import { adminCheck } from "../middleware/validateRequest.js";

const router = Router();

// Get user object from email
router.get(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const user = await Users.findOne({ email });

      if (!user) throw new ApiError(404, "User with that email does not exist");

      res.status(200).json(user);
      next();
    } catch (error) {
      next(error);
    }
  }
);

router
  .route("/")
  // Get all users
  .get(adminCheck, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Users.find().toArray();

      res.status(200).json({ result });
      next();
    } catch (error) {
      next(error);
    }
  });
export default router;
