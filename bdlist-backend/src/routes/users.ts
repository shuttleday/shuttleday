import { NextFunction, Request, Response, Router } from "express";
import { Rooms, Users } from "../db/collections.js";
import { ApiError } from "../utils/error-util.js";
import { ObjectId } from "mongodb";
import {
  isAdminByEmail,
  isEmailInPlayerList,
  isValidObjectId,
} from "../utils/functions.js";
import { RoomPlayer } from "../db/interfaces.js";

const router = Router();

// Get user in a room by email
// Only those in the room can query
router.get(
  "/rooms/:roomId/users/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const roomId = req.params.roomId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");

      // Check if requester is in room
      const playerList = room.playerList;
      if (!isEmailInPlayerList(playerList, req.user.email))
        throw new ApiError(403, "You are not part of the room");

      // Check if player email is in room
      if (!isEmailInPlayerList(playerList, email))
        throw new ApiError(403, "Player is not in the room");

      const user = await Users.findOne({ email });

      if (!user) throw new ApiError(404, "User with that email does not exist");

      // Get isAdmin status for requested player
      const requestedPlayer = playerList.find(
        (player) => player.email === email
      );

      res.status(200).json(Object.assign(user, requestedPlayer));
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Join a new room based on its password
// All room passwords are unique anyway
router
  .route("/rooms/join")
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attemptedPw = req.body.password;

      const room = await Rooms.findOne({
        password: attemptedPw,
      });
      if (!room) throw new ApiError(400, "Invalid password");
      const emailList = room.playerList.map((player) => player.email);
      if (emailList.includes(req.user.email))
        throw new ApiError(400, "You are already in this room");

      const player: RoomPlayer = {
        username: req.user.username,
        email: req.user.email,
        isAdmin: false,
      };
      const result = await Rooms.findOneAndUpdate(
        { _id: room._id },
        {
          $push: {
            playerList: player,
          },
        },
        { returnDocument: "after" }
      );

      if (result.value === null)
        throw new ApiError(500, "Internal server error");

      res.status(200).json({ playerList: result.value.playerList });
    } catch (error) {
      next(error);
    }
  });

router
  // Get all users in a room
  // Only those in the room can query
  .route("/rooms/:roomId/users")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");
      const emailList = room.playerList.map((player) => player.email);

      const query = { email: { $in: emailList } };
      const users = await Users.find(query).toArray();

      res.status(200).json({ users });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Remove self from a room
  // Must be in the room
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");
      // Check if the requester is an admin
      if (await isAdminByEmail(roomId, req.user.email))
        throw new ApiError(403, "Admins cannot remove themselves from rooms");

      const result = await Rooms.findOneAndUpdate(
        { _id: new ObjectId(roomId), "playerList.email": req.user.email },
        {
          $pull: {
            playerList: {
              email: req.user.email,
            },
          },
        },
        { returnDocument: "after" }
      );

      if (result.value === null)
        throw new ApiError(404, "You are not in that room");

      res.status(200).json({ playerList: result.value.playerList });
    } catch (error) {
      next(error);
    }
  });

export default router;
