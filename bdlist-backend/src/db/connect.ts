import { MongoClient } from "mongodb";
import log from "../utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.MONGO_URL as string;
export const client = new MongoClient(dbUri, {
  minPoolSize: 10,
});

async function connect() {
  try {
    await client.connect();
    log.info("Database connected");
  } catch (error) {
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;
