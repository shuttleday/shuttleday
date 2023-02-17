import { client } from "./connect";
import { User, GameSession, Password } from "./interfaces";

const db = client.db();

export const Users = db.collection<User>("users");
export const GameSessions = db.collection<GameSession>("game-sessions");
export const Passwords = db.collection<Password>("passwords");
