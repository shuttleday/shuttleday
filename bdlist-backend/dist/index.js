"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = __importDefault(require("./setup"));
const logger_1 = __importDefault(require("./utils/logger"));
const connect_1 = require("./db/connect");
const port = process.env.SERVER_PORT;
// Start server and connect to db
setup_1.default.listen(parseInt(port), async () => {
    logger_1.default.info(`Server is running on port ${port}.`);
    await (0, connect_1.connectDb)();
});
//# sourceMappingURL=index.js.map