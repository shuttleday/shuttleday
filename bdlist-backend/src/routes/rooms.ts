import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Rooms } from "../db/collections.js";
import { Room } from "../db/interfaces.js";
import { ApiError } from "../utils/error-util.js";
import crypto from "crypto";
import { isValidObjectId } from "../utils/functions.js";

const router = Router();

// Get rooms
router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await Rooms.find().toArray();
      if (rooms.length === 0)
        throw new ApiError(404, "No rooms have been made");

      const modifiedRooms = rooms.map((room) => {
        return {
          id: room._id,
          name: room.name,
          description: room.description,
          creatorEmail: room.creatorEmail,
          creatorUsername: room.creatorUsername,
          playerCount: room.playerList.length,
        };
      });

      res.status(200).json({ rooms: modifiedRooms });
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
      creatorEmail: req.user.email,
      creatorUsername: req.user.username,
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
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");

      const room = await Rooms.findOne({
        _id: new ObjectId(roomId),
      });

      if (!room) throw new ApiError(404, "Room with that id does not exist");

      const modifiedRoom = {
        id: room._id,
        name: room.name,
        description: room.description,
        creatorEmail: room.creatorEmail,
        creatorUsername: room.creatorUsername,
        playerCount: room.playerList.length,
      };

      res.status(200).json(modifiedRoom);
      next();
    } catch (error) {
      next(error);
    }
  })
  // Update room details by id
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      const userEmail = req.user.email;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      // Update and return new document
      const result = await Rooms.findOneAndUpdate(
        { _id: new ObjectId(roomId), adminList: { $in: [userEmail] } },
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
        throw new ApiError(404, "No room with that id or not an admin");

      res.status(200).json({ result: result.value });
    } catch (error) {
      next(error);
    }
  });

// Get room password by id
router
  .route("/:roomId/password")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
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

      res.status(200).json(room);
      next();
    } catch (error) {
      next(error);
    }
  });

export default router;
