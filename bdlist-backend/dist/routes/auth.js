"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collections_1 = require("../db/collections");
const functions_1 = require("../utils/functions");
const error_util_1 = require("../utils/error-util");
const validateRequest_1 = require("../middleware/validateRequest");
const mongodb_1 = require("mongodb");
const router = (0, express_1.Router)();
router.post("/register", validateRequest_1.validatePOST, async (req, res, next) => {
    try {
        // Get details of user trying to sign up
        const decoded = await (0, functions_1.validateGJwt)(req);
        // Ensure user with that email doesn't already exist
        if (await (0, functions_1.userExists)(decoded?.email))
            throw new error_util_1.ApiError(409, "User with that email already exists");
        const document = {
            _id: new mongodb_1.ObjectId(),
            email: decoded?.email,
            firstName: decoded?.given_name,
            lastName: decoded?.family_name,
            username: req.body.username,
            createdAt: new Date(),
            userType: "player", // default
        };
        await collections_1.Users.insertOne(document);
        const accessToken = (0, functions_1.genAccessToken)(document);
        const refreshToken = (0, functions_1.genRefreshToken)(document);
        res.status(201).json({ user: document, accessToken, refreshToken });
        next();
    }
    catch (error) {
        if (error.message.startsWith("Invalid Google JWT"))
            return res.sendStatus(401);
        next(error);
    }
});
// Get Shuttleday JWT
router.post("/signin", validateRequest_1.validatePOST, async (req, res, next) => {
    try {
        // Validate and get email from G JWT
        const decoded = await (0, functions_1.validateGJwt)(req);
        const userEmail = decoded?.email;
        // Get user information in JWT
        const result = await collections_1.Users.findOne({ email: userEmail });
        if (!result)
            throw new error_util_1.ApiError(404, "No user with that email");
        const accessToken = (0, functions_1.genAccessToken)(result);
        const refreshToken = (0, functions_1.genRefreshToken)(result);
        res.status(201).json({ accessToken, refreshToken });
        next();
    }
    catch (error) {
        next(error);
    }
});
// Get new access token from refresh token
// Updates db with new hash
router.post("/refreshToken", async (req, res, next) => {
    try {
        const candidateToken = req.body.refreshToken;
        // Validate candidateToken
        const decoded = (0, functions_1.verifyRefreshToken)(candidateToken);
        const userEmail = decoded.email;
        // Check if user exists
        const found = await collections_1.Users.findOne({ email: userEmail });
        if (!found)
            throw new error_util_1.ApiError(404, "No user with that email");
        // Generate new access token
        const newAccessToken = (0, functions_1.genAccessToken)(found);
        // Return new access token
        res.status(201).json({ accessToken: newAccessToken });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map