import { NextFunction, Request, Response, Router } from "express";
import { ObjectId, Filter } from "mongodb";
import { GameSessions } from "../db/collections";
import {
  adminCheck,
  validateNewGameSessionDate,
} from "../middleware/validateRequest";
import { GameSession } from "../db/interfaces";
import { validateDates } from "../utils/functions";
import { ApiError } from "../utils/error-util";

const router = Router();

// Get game sessions by date range
router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Build query
      const { fromDate, toDate } = validateDates(req);
      const query: Filter<GameSession> = {
        start: {
          $gte: fromDate,
          $lte: toDate,
        },
      };

      const gameSessions = await GameSessions.find(query).toArray();

      res.status(200).json({ gameSessions });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Create new game session
  .post(
    adminCheck,
    validateNewGameSessionDate,
    async (req: Request, res: Response, next: NextFunction) => {
      if (typeof req.body.cost !== "number")
        throw new ApiError(400, "cost key must be of type number");

      const document: GameSession = {
        _id: new ObjectId(),
        start: new Date(req.body.start as string),
        end: new Date(req.body.end as string),
        players: [],
        cost: req.body.cost as number,
        courts: req.body.courts,
        createdAt: new Date(),
        payTo: req.user.email,
        title: req.body.title,
      };

      try {
        const result = await GameSessions.insertOne(document);
        res.status(201).json({ result, document });
        next();
      } catch (error) {
        next(error);
      }
    }
  )
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate courts key
      if (!(req.body.courts instanceof Array))
        throw new ApiError(400, "courts key must be of type string[]");
      for (const elem of req.body.courts) {
        if (typeof elem !== "string")
          throw new ApiError(400, "courts key must be of type string[]");
      }

      if (typeof req.body.cost !== "number")
        throw new ApiError(400, "cost key must be of type number");

      // Update and return new document
      const result = await GameSessions.findOneAndUpdate(
        { _id: new ObjectId(req.body.sessionId) },
        {
          $set: {
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            cost: req.body.cost as number,
            payTo: req.body.payTo,
            courts: req.body.courts as string[],
            title: req.body.title,
          },
        },
        { returnDocument: "after" }
      );
      if (result.value === null)
        throw new ApiError(404, "No session with that id");

      res.status(200).json({ result: result.value });
    } catch (error) {
      next(error);
    }
  });

// Get game session by id
router.get(
  "/:sessionId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = req.params.sessionId;

      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
      });

      if (!gameSession)
        throw new ApiError(404, "Game session with that id does not exist");

      res.status(200).json(gameSession);
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
