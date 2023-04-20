"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const functions_1 = require("../utils/functions");
const error_util_1 = require("../utils/error-util");
const excludedPaths = [
    "/healthcheck",
    "/g-auth",
    "/auth/signin",
    "/auth/refreshToken",
    "/auth/register",
];
// JWT Auth
const authenticate = async (req, res, next) => {
    try {
        if (excludedPaths.includes(req.path))
            return next();
        if (!req.headers.authorization)
            throw new error_util_1.ApiError(400, "No JWT provided");
        const token = req.headers.authorization?.split(" ")[1]; // Expects { Authorization: Bearer TOKEN } format
        if (!token)
            throw new error_util_1.ApiError(400, "No JWT provided");
        const decodedUser = (0, functions_1.verifyAccessToken)(token);
        const currentUser = {
            _id: decodedUser._id,
            email: decodedUser.email,
            firstName: decodedUser.firstName,
            lastName: decodedUser.lastName,
            username: decodedUser.username,
            createdAt: decodedUser.createdAt,
            userType: decodedUser.userType,
        };
        req.user = currentUser;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map