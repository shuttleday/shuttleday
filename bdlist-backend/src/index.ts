import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import log from "./utils/logger";
import connect from "./db/connect";
import routes from "./routes";
import authenticate from "./middleware/authenticate";
import { validateBody } from "./middleware/validateRequest";

const port = process.env.SERVER_PORT as string;
const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Authentication middleware
app.use(authenticate);

// Request validation middleware
app.use(validateBody);
// app.use(validateQuery);

// Start server
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  connect();
  routes(app);
});
