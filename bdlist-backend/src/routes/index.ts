import { Express } from "express";

import gameSessionsRouter from "./game-sessions";
import usersRouter from "./users";
import authRouter from "./auth";
import gAuthRouter from "./g-auth";
import sessionPlayersRouter from "./session-players";
import userPaymentsRouter from "./user-payments";
import paymentReceiptsRouter from "./payment-receipts";
import healthcheckRouter from "./healthcheck";

export default function (app: Express) {
  app.use("/g-auth", gAuthRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/game-sessions", gameSessionsRouter);
  app.use("/session-players", sessionPlayersRouter);
  app.use("/user-payments", userPaymentsRouter);
  app.use("/payment-receipts", paymentReceiptsRouter);
  app.use("/healthcheck", healthcheckRouter);
}
