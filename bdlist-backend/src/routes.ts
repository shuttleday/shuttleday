import { Express, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { addPrefix } from "./utils/apiRoute";
import { Users, GameSessions } from "./db/collections";
import { GameSession, User } from "./db/interfaces";
import { validateNewGameSessionDate } from "./utils/validateRequest";
import log from "./utils/logger";

export default function (app: Express) {
  // healthcheck for API service
  app.get(addPrefix("healthcheck"), (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // Get game sessions based on date range
  app.get(addPrefix("game-session"), async (req: Request, res: Response) => {
    const fromDate: Date = req.query.fromDate
      ? new Date(req.query.fromDate as string)
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const toDate: Date = req.query.toDate
      ? new Date(req.query.toDate as string)
      : new Date(); // current date

    const gameSessions = await GameSessions.find({
      date: {
        $gte: fromDate,
        $lte: toDate,
      },
    }).toArray();

    res.status(200).json(gameSessions);
  });

  // Create new game session
  app.post(
    addPrefix("game-session"),
    validateNewGameSessionDate,
    async (req: Request, res: Response) => {
      const sessionDate = new Date(req.body.date as string);

      const document: GameSession = {
        date: sessionDate,
        players: [],
        cost: req.body.cost as number,
        group: req.body.group,
        createdAt: new Date(),
        payTo: req.body.payToUser,
      };

      const result = await GameSessions.insertOne(document);
      res.status(200).json({ ack: result.acknowledged, document });
    }
  );

  // Add user to game session
  app.put(
    addPrefix("session-add-user"),
    async (req: Request, res: Response) => {
      const result = await GameSessions.updateOne(
        { _id: new ObjectId(req.body.sessionId) },
        {
          $push: {
            players: {
              user: req.body.userEmail,
              paid: false,
              paidAt: undefined,
            },
          },
        }
      );

      log.info(result);
      res.status(200).json({ ack: result.acknowledged });
    }
  );

  // Update payment status of user TODO
  app.put(
    addPrefix("game-session-user"),
    async (req: Request, res: Response) => {
      const result = await GameSessions.updateOne(
        { _id: req.body.sessionId, players: { email: req.body.playerEmail } },
        { $set: {} }
      );
    }
  );

  // Create new user
  app.post(addPrefix("user"), async (req: Request, res: Response) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const nickname = req.body.nickname;

    const document: User = {
      email,
      firstName,
      lastName,
      nickname,
      createdAt: new Date(),
    };

    const result = await Users.insertOne(document);
    res.status(200).json({ ack: result.acknowledged, document });
  });
}
