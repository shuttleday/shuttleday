import { NextFunction, Request, Response, Router } from "express";
import { ObjectId, Filter } from "mongodb";
import { GameSessions, Rooms } from "../db/collections.js";
import { validateNewGameSessionDate } from "../middleware/validateRequest.js";
import { GameSession } from "../db/interfaces.js";
import { isValidObjectId, validateDates } from "../utils/functions.js";
import { ApiError } from "../utils/error-util.js";

const router = Router();

// Get game sessions by date range
router
  .route("/rooms/:roomId/sessions")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");

      // Build query
      const { fromDate, toDate } = validateDates(req);
      const query: Filter<GameSession> = {
        roomId,
        start: {
          $gte: fromDate,
          $lte: toDate,
        },
      };

      const gameSessions = await GameSessions.find(query).toArray();

      if (gameSessions.length === 0) throw new ApiError(404, "No sessions");

      res.status(200).json({ gameSessions });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Create new game session
  .post(
    validateNewGameSessionDate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // validation
        if (typeof req.body.cost !== "number")
          throw new ApiError(400, "cost key must be of type number");

        // check if requester is an admin of the room by roomId
        const userEmail = req.user.email;
        const roomId = req.params.roomId;
        if (!isValidObjectId(roomId))
          throw new ApiError(400, "Not a valid room ID");

        const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
        if (!room) throw new ApiError(404, "No room with that ID");

        const roomAdminList = room.adminList;
        if (!roomAdminList.includes(userEmail))
          throw new ApiError(403, "You are not an admin of this room");

        // create new game session
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
          roomId,
        };

        const result = await GameSessions.insertOne(document);
        res.status(201).json({ result, document });
        next();
      } catch (error) {
        next(error);
      }
    }
  );

// Get session by id
router
  .route("/sessions/:sessionId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ID validation
      const sessionId = req.params.sessionId;
      if (!isValidObjectId(sessionId))
        throw new ApiError(400, "Not a valid session ID");

      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
      });

      if (!gameSession)
        throw new ApiError(404, "Session with that id does not exist");

      const room = await Rooms.findOne({
        _id: new ObjectId(gameSession.roomId),
      });

      if (!room!.playerList.includes(req.user.email))
        throw new ApiError(403, "You are not a part of this room");

      res.status(200).json(gameSession);
      next();
    } catch (error) {
      next(error);
    }
  })
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

      // Session ID validation
      const sessionId = req.params.sessionId;
      if (!isValidObjectId(sessionId))
        throw new ApiError(400, "Not a valid session ID");

      const gameSession = await GameSessions.findOne({
        _id: new ObjectId(sessionId),
      });

      if (!gameSession)
        throw new ApiError(404, "Session with that id does not exist");

      // check if requester is an admin of the room by roomId
      const userEmail = req.user.email;
      const roomId = gameSession.roomId;
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });

      const roomAdminList = room!.adminList;
      if (!roomAdminList.includes(userEmail))
        throw new ApiError(403, "You are not an admin of this room");

      // Update and return new document
      const result = await GameSessions.findOneAndUpdate(
        { _id: new ObjectId(sessionId) },
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

export default router;
