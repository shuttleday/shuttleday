import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import log from "./utils/logger";
import routes from "./routes";
import authenticate from "./middleware/authenticate";
import { validateBody } from "./middleware/validateRequest";
import testDbConn from "./db/connect";

const port = process.env.SERVER_PORT as string;
const app = express();

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
const server = app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  testDbConn();
});

export default server;
