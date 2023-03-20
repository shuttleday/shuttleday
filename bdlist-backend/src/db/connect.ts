import { MongoClient } from "mongodb";
import log from "../utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

let username: string;
let password: string;
let dbUri: string;
switch (process.env.NODE_ENV) {
  case "test":
    dbUri = process.env.TEST_MONGO_URL!;
    username = encodeURIComponent(process.env.TEST_MONGO_USER!);
    password = encodeURIComponent(process.env.TEST_MONGO_PW!);
    break;
  case "production":
    dbUri = process.env.MONGO_URL!;
    username = encodeURIComponent(process.env.MONGO_USER!);
    password = encodeURIComponent(process.env.MONGO_PW!);
    break;
  default:
    dbUri = process.env.MONGO_URL!;
    username = encodeURIComponent(process.env.MONGO_USER!);
    password = encodeURIComponent(process.env.MONGO_PW!);
    break;
}

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
