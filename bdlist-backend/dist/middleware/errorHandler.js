"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_util_1 = require("../utils/error-util");
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = async (err, req, res, next) => {
    logger_1.default.error(err);
    if (err instanceof error_util_1.ApiError)
        (0, error_util_1.apiErrorHandler)(err, res);
    else
        (0, error_util_1.throwInternalServerError)(res);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map