import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Rooms } from "../db/collections.js";
import { Room } from "../db/interfaces.js";
import { ApiError } from "../utils/error-util.js";
import crypto from "crypto";

const router = Router();

// Get rooms
router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await Rooms.find().toArray();
      if (rooms.length === 0)
        throw new ApiError(404, "No rooms have been made");

      res.status(200).json({ rooms });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Create new room
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const document: Room = {
      _id: new ObjectId(),
      name: req.body.name,
      description: req.body.description,
      creator: req.user.email,
      adminList: [req.user.email],
      playerList: [req.user.email],
      createdAt: new Date(),
      updatedAt: new Date(),
      password: crypto.randomBytes(5).toString("base64url"),
    };

    try {
      const result = await Rooms.insertOne(document);
      res.status(201).json({ result, document });
      next();
    } catch (error) {
      next(error);
    }
  });

// Get room by id
router
  .route("/:roomId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;

      const room = await Rooms.findOne({
        _id: new ObjectId(roomId),
      });

      if (!room) throw new ApiError(404, "Room with that id does not exist");

      res.status(200).json(room);
      next();
    } catch (error) {
      next(error);
    }
  })
  // Update room by id
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Update and return new document
      const result = await Rooms.findOneAndUpdate(
        { _id: new ObjectId(req.params.roomId) },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );
      if (result.value === null)
        throw new ApiError(404, "No room with that id");

      res.status(200).json({ result: result.value });
    } catch (error) {
      next(error);
    }
  });

export default router;
