import { NextFunction, Request, Response, Router } from "express";
import { Rooms, Users } from "../db/collections.js";
import { ApiError } from "../utils/error-util.js";
import { ObjectId } from "mongodb";

const router = Router();

// Get user in a room by email
router.get(
  "/rooms/:roomId/users/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const roomId = req.params.roomId;
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");

      if (room.playerList.includes(email))
        throw new ApiError(404, "Player is not in room");

      const user = await Users.findOne({ email });

      if (!user) throw new ApiError(404, "User with that email does not exist");

      res.status(200).json(user);
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Get all users in a room
router
  .route("/rooms/:roomId/users")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");
      const roomPlayerList = room?.playerList;

      const query = { email: { $in: roomPlayerList } };
      const users = await Users.find(query).toArray();

      res.status(200).json({ users });
      next();
    } catch (error) {
      next(error);
    }
  })
  // Add user to a room
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");

      if (req.body.password !== room.password)
        throw new ApiError(401, "Incorrect password");

      const result = await Rooms.findOneAndUpdate(
        { _id: new ObjectId(roomId) },
        {
          $push: {
            playerList: {
              userEmail: req.user.email,
            },
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
  // Remove user from a room
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      const room = await Rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new ApiError(404, "No room with that ID");

      const result = await Rooms.findOneAndUpdate(
        { _id: new ObjectId(roomId), playerList: { $in: [req.user.email] } },
        {
          $pull: {
            playerList: {
              userEmail: req.user.email,
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
