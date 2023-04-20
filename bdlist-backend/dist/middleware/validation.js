"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredPATCH = exports.requiredGET = exports.requiredPOST = void 0;
exports.requiredPOST = {
    "/auth/register": ["username"],
    "/game-sessions": ["start", "end", "cost", "courts"],
    "/session-players": ["sessionId"],
    "/refreshToken": ["refreshToken"],
};
exports.requiredGET = {
    "/payment-receipts": ["sessionId"],
};
exports.requiredPATCH = {
    "/game-sessions": ["sessionId", "start", "end", "cost", "payTo", "courts"],
};
//# sourceMappingURL=validation.js.map