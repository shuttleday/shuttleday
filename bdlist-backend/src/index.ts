import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import log from "./utils/logger";
import routes from "./routes/index";
import authenticate from "./middleware/authenticate";
import connectDb from "./db/connect";
import errorHandler from "./middleware/errorHandler";
import requestLogger from "./middleware/logger";
import {
  validateGET,
  validatePATCH,
  validatePOST,
} from "./middleware/validateRequest";

const port = process.env.SERVER_PORT as string;
export const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Enable CORS on all routes
app.use(cors());

// Authentication middleware
app.use(authenticate);

// Request validation middleware
app.use(validateGET);
app.use(validatePOST);
app.use(validatePATCH);

// Load routes
routes(app);

// Load request logger
app.use(requestLogger);

// Load error handler
app.use(errorHandler);

// Start server and connect to db
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  connectDb();
});

export default app;
