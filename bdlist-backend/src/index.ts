import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import log from "./utils/logger";
import routes from "./routes";
import authenticate from "./middleware/authenticate";
import { validateBody } from "./middleware/validateRequest";
import connectDb from "./db/connect";
import errorHandler from "./middleware/errorHandler";

const port = process.env.SERVER_PORT as string;
export const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Enable CORS on all routes
app.use(cors());

// Authentication middleware
app.use(authenticate);

// Request validation middleware
app.use(validateBody);
// app.use(validateQuery);

// Load routes
routes(app);

// Load error handler
app.use(errorHandler);

// Start server and connect to db
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  connectDb();
});

export default app;
