import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import log from "./utils/logger";
import connect from "./db/connect";
import routes from "./routes";

const port = process.env.SERVER_PORT as string;
const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// start server
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  connect();
  routes(app);
});
