import { MongoClient } from "mongodb";
import log from "../utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

const username = encodeURIComponent(process.env.MONGO_USER!);
const password = encodeURIComponent(process.env.MONGO_PW!);
const dbUri = process.env.MONGO_URL as string;

const uri = `mongodb://${username}:${password}@${dbUri}`;

export const client = new MongoClient(uri, {
  minPoolSize: 10,
});

async function connectDb() {
  try {
    log.info(`Attempting connection to: ${uri}`);
    await client.connect();
    log.info("Database connected successfully");
  } catch (error) {
    log.error("Failed to connect to db");
    log.error(error);
    process.exit(1);
  }
}

async function disconnectDb() {
  try {
    log.info(`Attempting to close connection to: ${uri}`);
    await client.close();
    log.info("Database disconnect successfully");
  } catch (error) {
    log.error("Failed to disconnect from db");
    log.error(error);
    process.exit(1);
  }
}

export { connectDb, disconnectDb };
