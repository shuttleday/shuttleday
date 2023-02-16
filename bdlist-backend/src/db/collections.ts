import { client } from "./connect";

const db = client.db();

export const Users = db.collection("users");
export const GameSessions = db.collection("game-sessions");
