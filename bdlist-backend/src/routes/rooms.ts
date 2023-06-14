import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Rooms, Users } from "../db/collections.js";
import { Room, RoomPlayer } from "../db/interfaces.js";
import { ApiError } from "../utils/error-util.js";
import crypto from "crypto";
import {
  isAdminByEmail,
  isValidObjectId,
  validateLimitOffset,
} from "../utils/functions.js";

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
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      // Update and return new document
      const result = await Rooms.findOneAndUpdate(
        {
          _id: new ObjectId(roomId),
          playerList: { $elemMatch: { email: req.user.email, isAdmin: true } },
        },
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
  })
  // Delete room by ID
  // Only creator of the room may do this
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      const userEmail = req.user.email;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      // Update and return new document
      const result = await Rooms.findOneAndDelete({
        _id: new ObjectId(roomId),
        creatorEmail: userEmail,
      });
      if (result.value === null)
        throw new ApiError(404, "No room with that id or not the creator");

      res.status(200).json({ ok: true });
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

      const room = await Rooms.findOne({
        _id: new ObjectId(roomId),
        playerList: { $elemMatch: { email: req.user.email, isAdmin: true } },
      });
      if (!room)
        throw new ApiError(404, "No room with that ID or not an admin");

      res.status(200).json(room);
      next();
    } catch (error) {
      next(error);
    }
  });

router
  // Promote an existing member in the room to an admin
  // Only admins may promote members
  .route("/:roomId/users/:userEmail/promote")
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      const userEmail = req.user.email;
      const roomId = req.params.roomId;
      const emailToPromote = req.params.userEmail;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");

      const user = await Users.findOne({ email: emailToPromote });
      if (!user) throw new ApiError(404, "No user with that email");

      if (user.email === userEmail)
        throw new ApiError(400, "Cannot promote yourself");

      // Check if the requester is an admin
      if (!(await isAdminByEmail(roomId, userEmail)))
        throw new ApiError(403, "Only admins can perform this action");

      // Update and return new document
      // Looks for room with specified ID
      // checks that player to promote is in the playerList
      const updatedRoom = await Rooms.findOneAndUpdate(
        {
          _id: new ObjectId(roomId),
          playerList: { $elemMatch: { email: user.email } },
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
          "No room with that ID, not an admin or user is not in room"
        );

      const updatedPlayerList = updatedRoom.value.playerList;
      res.status(200).json(updatedPlayerList);
      next();
    } catch (error) {
      next(error);
    }
  });

router
  // Demote an existing member in the room from an admin to a player
  // Only the creator may demote admins
  .route("/:roomId/users/:userEmail/demote")
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      const userEmail = req.user.email;
      const roomId = req.params.roomId;
      const emailToDemote = req.params.userEmail;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");

      const user = await Users.findOne({ email: emailToDemote });
      if (!user) throw new ApiError(404, "No user with that email");

      if (user.email === userEmail)
        throw new ApiError(400, "Cannot demote yourself");

      // Check if the requester is an admin of the room
      if (!(await isAdminByEmail(roomId, userEmail)))
        throw new ApiError(403, "Only admins can perform this action");

      // Update and return new document
      // Looks for room with specified ID
      // checks that player to promote is in the playerList
      const updatedRoom = await Rooms.findOneAndUpdate(
        {
          _id: new ObjectId(roomId),
          playerList: { $elemMatch: { email: user.email } },
          creatorEmail: userEmail,
        },
        {
          $set: {
            "playerList.$.isAdmin": false,
          },
        },
        { returnDocument: "after" }
      );
      if (updatedRoom.value === null)
        throw new ApiError(
          404,
          "No room with that ID, not the creator or user is not in room"
        );

      const updatedPlayerList = updatedRoom.value.playerList;
      res.status(200).json(updatedPlayerList);
      next();
    } catch (error) {
      next(error);
    }
  });

export default router;
