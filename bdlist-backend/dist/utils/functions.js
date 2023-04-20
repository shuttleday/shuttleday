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
exports.userExists = exports.verifyRefreshToken = exports.verifyAccessToken = exports.genRefreshToken = exports.genAccessToken = exports.validateDates = exports.validateGJwt = exports.processUploadedFiles = exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const collections_1 = require("../db/collections");
const error_util_1 = require("./error-util");
dotenv.config();
const CLIENT_ID = process.env.G_AUTH_CLIENT_ID;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
const REGION = "ap-southeast-1";
exports.s3 = new client_s3_1.S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
});
function processUploadedFiles(uploadedFiles) {
    return uploadedFiles[Object.keys(uploadedFiles)[0]];
}
exports.processUploadedFiles = processUploadedFiles;
async function validateGJwt(req) {
    const token = req.headers.authorization?.split(" ")[1]; // Expects { Authorization: Bearer TOKEN } format
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    const payload = verify().catch(() => {
        throw new error_util_1.ApiError(400, "Invalid Google JWT");
    });
    return payload;
}
exports.validateGJwt = validateGJwt;
function validateDates(req) {
    // Filter ListObjects by date
    const fromDate = req.query.fromDate
        ? new Date(req.query.fromDate)
        : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const toDate = req.query.toDate
        ? new Date(req.query.toDate)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead
    if (toDate < fromDate)
        throw new error_util_1.ApiError(400, "toDate cannot be before fromDate");
    return { fromDate, toDate };
}
exports.validateDates = validateDates;
function genAccessToken(userObj) {
    return jsonwebtoken_1.default.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
    });
}
exports.genAccessToken = genAccessToken;
function genRefreshToken(userObj) {
    return jsonwebtoken_1.default.sign(userObj, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "180d",
    });
}
exports.genRefreshToken = genRefreshToken;
function verifyAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (e) {
        throw new error_util_1.ApiError(401, "Invalid JWT");
    }
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (e) {
        throw new error_util_1.ApiError(401, "Invalid JWT");
    }
}
exports.verifyRefreshToken = verifyRefreshToken;
// Check if user with that email already exists
async function userExists(email) {
    const userExists = await collections_1.Users.findOne({ email });
    return userExists !== null;
}
exports.userExists = userExists;
//# sourceMappingURL=functions.js.map