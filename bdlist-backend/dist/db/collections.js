"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessions = exports.Users = void 0;
const connect_1 = require("./connect");
const db = connect_1.client.db("shuttleday-prod");
exports.Users = db.collection("users");
exports.GameSessions = db.collection("game-sessions");
//# sourceMappingURL=collections.js.map