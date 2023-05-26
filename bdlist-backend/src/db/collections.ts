import { client } from "./connect.js";
import { User, GameSession, Room } from "./interfaces.js";

const db = client.db("shuttleday-prod");

export const Users = db.collection<User>("users");
export const GameSessions = db.collection<GameSession>("game-sessions");
export const Rooms = db.collection<Room>("rooms");
