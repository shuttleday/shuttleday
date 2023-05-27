import { NextFunction, Request, Response, Router } from "express";
import { Rooms, Users } from "../db/collections.js";
import { ApiError } from "../utils/error-util.js";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "../utils/functions.js";
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
      const isRequesterInPlayerList = playerList.some((obj) =>
        Object.values(obj).includes(req.user.email)
      );
      if (!isRequesterInPlayerList)
        throw new ApiError(403, "You are not part of the room");

      // Check if player email is in room
      const isPlayerInList = playerList.some((obj) =>
        Object.values(obj).includes(email)
      );
      if (!isPlayerInList) throw new ApiError(403, "Player is not in the room");

      const user = await Users.findOne({ email });

      if (!user) throw new ApiError(404, "User with that email does not exist");

      res.status(200).json(user);
      next();
    } catch (error) {
      next(error);
    }
  }
);

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
  // Add self to a room
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      if (!isValidObjectId(roomId))
        throw new ApiError(400, "Not a valid room ID");
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");

      if (req.body.password !== room.password)
        throw new ApiError(401, "Incorrect password");

      const player: RoomPlayer = {
        username: req.user.username,
        email: req.user.email,
        isAdmin: false,
      };
      const result = await Rooms.findOneAndUpdate(
        { _id: new ObjectId(roomId) },
        {
          $push: {
            playerList: player,
          },
        }
      );

      if (result.value === null)
        throw new ApiError(500, "Internal server error");

      res.status(200).json({ playerList: result.value.playerList });
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
