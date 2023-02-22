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
        { _id: new ObjectId(req.body.sessionId) },
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

      res.status(201).json({ players: result.value?.players });
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
          "players.userEmail": req.user.email,
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

      res.status(200).json({ players: result.value?.players });
    } catch (error) {
      next(error);
    }
  });

export default router;
