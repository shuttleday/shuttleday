import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import log from "./utils/logger";
import routes from "./routes";
import authenticate from "./middleware/authenticate";
import { validateBody } from "./middleware/validateRequest";
import connectDb from "./db/connect";

const port = process.env.SERVER_PORT as string;
export const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Authentication middleware
app.use(authenticate);

// Request validation middleware
app.use(validateBody);
// app.use(validateQuery);

// Load routes
routes(app);

// Start server and test db connection
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  connectDb();
});

export default app;
