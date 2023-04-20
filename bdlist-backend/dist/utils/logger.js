"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const dev = {
    translateTime: "yyyy-mm-dd HH:MM:ss.l",
    colorize: true,
    ignore: "pid,hostname",
};
const prod = {
    destination: "./last.log",
    translateTime: "yyyy-mm-dd HH:MM:ss.l",
    colorize: false,
    ignore: "pid,hostname",
};
const log = pino({
    transport: {
        target: "pino-pretty",
        level: "info",
        options: dev,
    },
});
exports.default = log;
//# sourceMappingURL=logger.js.map