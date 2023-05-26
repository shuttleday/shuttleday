import { Express } from "express";

import gameSessionsRouter from "./game-sessions.js";
import usersRouter from "./users.js";
import authRouter from "./auth.js";
import sessionPlayersRouter from "./session-players.js";
import paymentsRouter from "./payments.js";
import roomsRouter from "./rooms.js";
import healthcheckRouter from "./healthcheck.js";
import userQrsRouter from "./user-qrs.js";

export default function (app: Express) {
  app.use("/auth", authRouter);
  app.use("/", usersRouter);
  app.use("/", gameSessionsRouter);
  app.use("/", sessionPlayersRouter);
  app.use("/", paymentsRouter);
  app.use("/rooms", roomsRouter);
  app.use("/healthcheck", healthcheckRouter);
  app.use("/", userQrsRouter);
}
