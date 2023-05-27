import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Rooms, Users } from "../db/collections.js";
import { Room, RoomPlayer } from "../db/interfaces.js";
import { ApiError } from "../utils/error-util.js";
import crypto from "crypto";
import { isValidObjectId, validateLimitOffset } from "../utils/functions.js";

const router = Router();

router
  // Get basic info for all rooms
  // Any user can query this
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offsetValue, limitValue } = validateLimitOffset(req);

      const rooms = await Rooms.find()
        .skip(offsetValue)
        .limit(limitValue)
        .toArray();
      if (rooms.length === 0)
        throw new ApiError(404, "No rooms have been made");

      const modifiedRooms = rooms.map((room) => {
        return {
          id: room._id,
          name: room.name,
          description: room.description,
          creatorUsername: room.creatorUsername,
          playerCount: room.playerList.length,
        };
      });

      res
        .status(200)
        .json({ rooms: modifiedRooms, limit: limitValue, offset: offsetValue });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Create new room
  // Any user can create a new room
  // They will automatically be made the admin of that room
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const admin: RoomPlayer = {
      username: req.user.username,
      email: req.user.email,
      isAdmin: true,
    };
    const document: Room = {
      _id: new ObjectId(),
      name: req.body.name,
      description: req.body.description,
      creatorEmail: req.user.email,
      creatorUsername: req.user.username,
      playerList: [admin],
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
// Only those inside the room already can get this specific room data
router
  .route("/:roomId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");

      // Looks for a room with that ID and
      // has the requester's email in the playerList
      const room = await Rooms.findOne({
        _id: new ObjectId(roomId),
        playerList: { $elemMatch: { email: req.user.email } },
      });

      if (!room) throw new ApiError(404, "No room with you and that ID");

      res.status(200).json(room);
      next();
    } catch (error) {
      next(error);
    }
  })
  // Update room details by id
  // Only admins of the room may update
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
// Only admins of the room may get the pw
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

router
  // Promote an existing member in the room to an admin
  // Only admins may promote members
  .route("/:roomId/players/:playerId/promote")
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      const userEmail = req.user.email;
      const roomId = req.params.roomId;
      const playerId = req.params.playerId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      if (!isValidObjectId(playerId))
        throw new ApiError(400, "Not a valid player ID");

      const player = await Users.findOne({ _id: new ObjectId(playerId) });
      if (!player) throw new ApiError(404, "No user with that ID");

      if (player.email === userEmail)
        throw new ApiError(400, "Cannot promote yourself");

      // Check if the requester is an admin
      const isAdminRequester = await Rooms.findOne({
        _id: new ObjectId(roomId),
        "playerList.email": userEmail,
        "playerList.isAdmin": true,
      });
      if (!isAdminRequester)
        throw new ApiError(403, "Only admins can perform this action");

      // Update and return new document
      // Looks for room with specified ID
      // checks that player to promote is in the playerList
      const updatedRoom = await Rooms.findOneAndUpdate(
        {
          _id: new ObjectId(roomId),
          playerList: { $elemMatch: { email: player.email } },
        },
        {
          $set: {
            "playerList.$.isAdmin": true,
          },
        },
        { returnDocument: "after" }
      );
      if (updatedRoom.value === null)
        throw new ApiError(
          404,
          "No room with that ID, not an admin or player is not in room"
        );

      res.status(200).json(updatedRoom);
      next();
    } catch (error) {
      next(error);
    }
  });

export default router;
