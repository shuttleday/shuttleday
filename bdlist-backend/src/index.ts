import app from "./setup.js";
import log from "./utils/logger.js";
import { connectDb } from "./db/connect.js";

const port = process.env.SERVER_PORT as string;

// Start server and connect to MongoDB
app.listen(parseInt(port), async () => {
  log.info(`Server is running on port ${port}.`);
  await connectDb();
});
