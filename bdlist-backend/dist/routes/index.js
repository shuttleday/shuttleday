"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_sessions_1 = __importDefault(require("./game-sessions"));
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const session_players_1 = __importDefault(require("./session-players"));
const user_payments_1 = __importDefault(require("./user-payments"));
const payment_receipts_1 = __importDefault(require("./payment-receipts"));
const healthcheck_1 = __importDefault(require("./healthcheck"));
function default_1(app) {
    app.use("/auth", auth_1.default);
    app.use("/users", users_1.default);
    app.use("/game-sessions", game_sessions_1.default);
    app.use("/session-players", session_players_1.default);
    app.use("/user-payments", user_payments_1.default);
    app.use("/payment-receipts", payment_receipts_1.default);
    app.use("/healthcheck", healthcheck_1.default);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map