"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const collections_1 = require("../db/collections");
const error_util_1 = require("../utils/error-util");
const router = (0, express_1.Router)();
router
    .route("/")
    // Add player to game session
    .post(async (req, res, next) => {
    try {
        const result = await collections_1.GameSessions.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(req.body.sessionId),
            "players.userEmail": { $nin: [req.user.email] },
        }, {
            $push: {
                players: {
                    userEmail: req.user.email,
                    username: req.user.username,
                    paid: false,
                    paidAt: undefined,
                },
            }, // Required or TS complains. Possibly a bug?
        }, { returnDocument: "after" });
        if (result.value === null)
            throw new error_util_1.ApiError(409, "Already added to this session");
        res.status(201).json({ players: result.value?.players });
        next();
    }
    catch (error) {
        next(error);
    }
})
    // Remove player from game session
    .delete(async (req, res, next) => {
    try {
        const result = await collections_1.GameSessions.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(req.body.sessionId),
            "players.userEmail": { $in: [req.user.email] },
        }, {
            $pull: {
                players: {
                    userEmail: req.user.email,
                },
            }, // Required or TS complains. Possibly a bug?
        }, { returnDocument: "after" });
        if (result.value === null)
            throw new error_util_1.ApiError(404, "User is not in this session");
        res.status(200).json({ players: result.value?.players });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=session-players.js.map