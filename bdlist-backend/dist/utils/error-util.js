"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwInternalServerError = exports.apiErrorHandler = exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    message;
    constructor(statusCode, message, ...params) {
        super(...params);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ApiError = ApiError;
function apiErrorHandler(error, res) {
    res.status(error.statusCode).json({ error: error.message });
}
exports.apiErrorHandler = apiErrorHandler;
function throwInternalServerError(res) {
    res.status(500).json({ error: "Internal server error" });
}
exports.throwInternalServerError = throwInternalServerError;
//# sourceMappingURL=error-util.js.map