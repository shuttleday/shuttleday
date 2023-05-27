import { NextFunction, Request, Response, Router } from "express";
import { ObjectId, PullOperator, PushOperator } from "mongodb";
import { GameSessions, Rooms } from "../db/collections.js";
import { ApiError } from "../utils/error-util.js";
import { isValidObjectId } from "../utils/functions.js";

const router = Router();

router
  .route("/sessions/:sessionId/players")
  // Add self to game session
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = req.params.sessionId;
      if (!isValidObjectId(sessionId))
        throw new ApiError(400, "Not a valid session ID");

      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
      });
      if (!gameSession) throw new ApiError(404, "No session with that ID");

      const room = await Rooms.findOne({
        _id: new ObjectId(gameSession.roomId),
        "playerList.email": req.user.email,
      });
      if (!room)
        throw new ApiError(404, "You are not in that room with that ID");

      const result = await GameSessions.findOneAndUpdate(
        {
          _id: new ObjectId(sessionId),
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
  // Remove self from game session
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = req.params.sessionId;
      if (!isValidObjectId(sessionId))
        throw new ApiError(400, "Not a valid session ID");

      // Get target game session
      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
        "players.userEmail": { $in: [req.user.email] },
      });

      if (!gameSession) throw new ApiError(404, "User is not in this session");

      const room = await Rooms.findOne({
        _id: new ObjectId(gameSession.roomId),
        "playerList.email": req.user.email,
      });
      if (!room)
        throw new ApiError(404, "You are not in that room with that ID");

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
          _id: new ObjectId(sessionId),
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
