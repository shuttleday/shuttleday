import { Express, Request, Response } from "express";
import { addPrefix } from "./utils/apiRoute";
import { Users, GameSessions } from "./db/collections";
import { User } from "./db/interfaces";

export default function (app: Express) {
  // healthcheck for API service
  app.get(addPrefix("healthcheck"), (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // Get game sessions based on date range
  app.get(addPrefix("game-sessions"), async (req: Request, res: Response) => {
    console.log(req.query);
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
    };

    const result = await Users.insertOne(document);

    res.status(200).json({ ack: result.acknowledged, document });
  });
}
