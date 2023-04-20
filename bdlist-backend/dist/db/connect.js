"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDb = exports.connectDb = exports.client = void 0;
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let username;
let password;
let dbUri;
switch (process.env.NODE_ENV) {
    case "test":
        dbUri = "localhost:2400/?authSource=shuttleday-prod";
        username = encodeURIComponent("user");
        password = encodeURIComponent("password");
        break;
    default:
        dbUri = process.env.MONGO_URL;
        username = encodeURIComponent(process.env.MONGO_USER);
        password = encodeURIComponent(process.env.MONGO_PW);
        break;
}
const uri = `mongodb://${username}:${password}@${dbUri}`;
exports.client = new mongodb_1.MongoClient(uri, {
    minPoolSize: 10,
});
async function connectDb() {
    try {
        logger_1.default.info(`Attempting connection to: ${uri}`);
        await exports.client.connect();
        logger_1.default.info("Database connected successfully");
    }
    catch (error) {
        logger_1.default.error("Failed to connect to db");
        logger_1.default.error(error);
        process.exit(1);
    }
}
exports.connectDb = connectDb;
async function disconnectDb() {
    try {
        logger_1.default.info(`Attempting to close connection to: ${uri}`);
        await exports.client.close();
        logger_1.default.info("Database disconnected successfully");
    }
    catch (error) {
        logger_1.default.error("Failed to disconnect from db");
        logger_1.default.error(error);
        process.exit(1);
    }
}
exports.disconnectDb = disconnectDb;
//# sourceMappingURL=connect.js.map