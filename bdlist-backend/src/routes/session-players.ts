import { NextFunction, Request, Response, Router } from "express";
import { ObjectId, PullOperator, PushOperator } from "mongodb";
import { GameSessions } from "../db/collections";

const router = Router();

router
  .route("/")
  // Add player to game session
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await GameSessions.findOneAndUpdate(
        {
          _id: new ObjectId(req.body.sessionId),
          "players.userEmail": { $nin: [req.user.email] },
        },
        {
          $push: {
            players: {
              userEmail: req.user.email,
              paid: false,
              paidAt: undefined,
            },
          } as PushOperator<Document>, // Required or TS complains. Possibly a bug?
        },
        { returnDocument: "after" }
      );

      if (result.value === null)
        return res.status(409).json({ error: "Already added to this session" });

      res.status(201).json({ players: result.value?.players });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Remove player from game session
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await GameSessions.findOneAndUpdate(
        {
          _id: new ObjectId(req.body.sessionId),
          "players.userEmail": { $in: [req.user.email] },
        },
        {
          $pull: {
            players: {
              userEmail: req.user.email,
            },
          } as PullOperator<Document>, // Required or TS complains. Possibly a bug?
        },
        { returnDocument: "after" }
      );

      if (result.value === null)
        return res.status(404).json({ error: "User is not in this session" });

      res.status(200).json({ players: result.value?.players });
      next();
    } catch (error) {
      next(error);
    }
  });

export default router;
