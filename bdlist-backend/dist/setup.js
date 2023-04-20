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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const index_1 = __importDefault(require("./routes/index"));
const authenticate_1 = require("./middleware/authenticate");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const validateRequest_1 = require("./middleware/validateRequest");
exports.app = (0, express_1.default)();
// Parse requests of content-type - application/json.
exports.app.use(express_1.default.json());
// Enable CORS on all routes
exports.app.use((0, cors_1.default)());
// Authentication middleware
exports.app.use(authenticate_1.authenticate);
// Request validation middleware
exports.app.use(validateRequest_1.validateGET);
exports.app.use(validateRequest_1.validatePOST);
exports.app.use(validateRequest_1.validatePATCH);
// Load routes
(0, index_1.default)(exports.app);
// Load error handler
exports.app.use(errorHandler_1.default);
exports.default = exports.app;
//# sourceMappingURL=setup.js.map