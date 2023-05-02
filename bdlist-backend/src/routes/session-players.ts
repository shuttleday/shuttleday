import { NextFunction, Request, Response, Router } from "express";
import { ObjectId, PullOperator, PushOperator } from "mongodb";
import { GameSessions } from "../db/collections.js";
import { ApiError } from "../utils/error-util.js";

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
              username: req.user.username,
              paid: false,
              paidAt: undefined,
            },
          } as PushOperator<Document>, // Required or TS complains. Possibly a bug?
        },
        { returnDocument: "after" }
      );

      if (result.value === null)
        throw new ApiError(409, "Already added to this session");

      res.status(201).json({ players: result.value?.players });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Remove player from game session
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get target game session
      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(req.body.sessionId),
        "players.userEmail": { $in: [req.user.email] },
      });

      if (!gameSession) throw new ApiError(404, "User is not in this session");

      // Deny removal if it's 48 hours before the start date
      const startDate = gameSession.start;
      const currentDate = new Date(); // date at time of request
      const diffMs = startDate.getTime() - currentDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      if (diffHours < 48)
        throw new ApiError(
          403,
          "Cannot leave the game session because the start date is less than 48 hours away or the session has ended"
        );

      // Remove user from session
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
        throw new ApiError(500, "Internal server error");

      res.status(200).json({ players: result.value?.players });
      next();
    } catch (error) {
      next(error);
    }
  });

export default router;
