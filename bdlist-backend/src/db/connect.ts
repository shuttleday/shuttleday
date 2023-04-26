import { MongoClient } from "mongodb";
import log from "../utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

let username: string;
let password: string;
let dbUri: string;
switch (process.env.NODE_ENV) {
  case "test":
    dbUri = "localhost:2400/?authSource=shuttleday-prod";
    username = encodeURIComponent("user");
    password = encodeURIComponent("password");
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
    log.info(`MongoDB: Attempting connection to: ${uri}`);
    await client.connect();
    log.info("MongoDB: Connected successfully");
  } catch (error) {
    log.error("MongoDB: Failed to connect");
    log.error(error);
    process.exit(1);
  }
}

async function disconnectDb() {
  try {
    log.info(`MongoDB: Attempting to close connection to: ${uri}`);
    await client.close();
    log.info("MongoDB: Disconnected successfully");
  } catch (error) {
    log.error("MongoDB: Failed to disconnect");
    log.error(error);
    process.exit(1);
  }
}

export { connectDb, disconnectDb };
