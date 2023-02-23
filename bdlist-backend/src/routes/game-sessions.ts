import { NextFunction, Request, Response, Router } from "express";
import { ObjectId, Filter } from "mongodb";
import { GameSessions } from "../db/collections";
import { validateNewGameSessionDate } from "../middleware/validateRequest";
import { GameSession } from "../db/interfaces";
import { validateDates } from "../utils/functions";

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

      // Add group filter
      if (req.query.group) query.group = req.query.group;

      const gameSessions = await GameSessions.find(query).toArray();

      res.status(200).json({ gameSessions });
    } catch (error) {
      next(error);
    }
  })
  // Create new game session
  .post(
    validateNewGameSessionDate,
    async (req: Request, res: Response, next: NextFunction) => {
      const document: GameSession = {
        _id: new ObjectId(),
        start: new Date(req.body.start as string),
        end: new Date(req.body.end as string),
        players: [],
        cost: req.body.cost as number,
        courts: req.body.courts,
        group: req.body.group,
        createdAt: new Date(),
        payTo: req.user.email,
      };

      try {
        const result = await GameSessions.insertOne(document);
        res.status(201).json({ result, document });
      } catch (error) {
        next(error);
      }
    }
  );

// Get game session by id
router.get(
  "/:sessionId",
  async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.params.sessionId as string;

    let gameSession;
    try {
      gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
      });
    } catch (error) {
      next(error);
    }

    if (!gameSession)
      return res
        .status(404)
        .json({ error: "Game session with that id does not exist." });

    res.status(200).json(gameSession);
  }
);

export default router;
