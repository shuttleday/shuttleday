import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { GameSessions } from "../db/collections";
import { validateNewGameSessionDate } from "../middleware/validateRequest";
import { GameSession } from "../db/interfaces";
import log from "../utils/logger";

const router = Router();

// Get game sessions by date range
router
  .route("/")
  .get(async (req: Request, res: Response) => {
    const fromDate: Date = req.query.fromDate
      ? new Date(req.query.fromDate as string)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const toDate: Date = req.query.toDate
      ? new Date(req.query.toDate as string)
      : new Date(); // current date

    try {
      const gameSessions = await GameSessions.find({
        date: {
          $gte: fromDate,
          $lte: toDate,
        },
      }).toArray();

      res.status(200).json(gameSessions);
    } catch (error) {
      log.error(error);
      res.sendStatus(500);
    }
  })
  // Create new game session
  .post(validateNewGameSessionDate, async (req: Request, res: Response) => {
    const document: GameSession = {
      _id: new ObjectId(),
      start: new Date(req.body.start as string),
      end: new Date(req.body.end as string),
      players: [],
      cost: req.body.cost as number,
      courts: req.body.courts,
      group: req.body.group,
      createdAt: new Date(),
      payTo: req.body.payToUser,
    };

    try {
      const result = await GameSessions.insertOne(document);
      res.status(200).json({ result, document });
    } catch (error) {
      log.error(error);
      res.sendStatus(500);
    }
  });

// Get game session by id
router.get("/:sessionId", async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId as string;

  let gameSession;
  try {
    gameSession = await GameSessions.findOne({
      _id: new ObjectId(sessionId),
    });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }

  if (!gameSession)
    return res
      .status(404)
      .json({ error: "Game session with that id does not exist." });

  res.status(200).json(gameSession);
});

export default router;