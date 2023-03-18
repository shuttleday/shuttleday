import app from "./setup";
import log from "utils/logger";
import { connectDb } from "db/connect";

const port = process.env.SERVER_PORT as string;

// Start server and connect to db
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  connectDb();
});
