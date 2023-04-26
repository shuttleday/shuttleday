import { Express } from "express";

import gameSessionsRouter from "./game-sessions.js";
import usersRouter from "./users.js";
import authRouter from "./auth.js";
import sessionPlayersRouter from "./session-players.js";
import userPaymentsRouter from "./user-payments.js";
import paymentReceiptsRouter from "./payment-receipts.js";
import healthcheckRouter from "./healthcheck.js";
import adminRouter from "./admins.js";

export default function (app: Express) {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/game-sessions", gameSessionsRouter);
  app.use("/session-players", sessionPlayersRouter);
  app.use("/user-payments", userPaymentsRouter);
  app.use("/payment-receipts", paymentReceiptsRouter);
  app.use("/healthcheck", healthcheckRouter);
  app.use("/admins", adminRouter);
}
