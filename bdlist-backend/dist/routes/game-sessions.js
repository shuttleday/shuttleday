"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const collections_1 = require("../db/collections");
const validateRequest_1 = require("../middleware/validateRequest");
const functions_1 = require("../utils/functions");
const error_util_1 = require("../utils/error-util");
const router = (0, express_1.Router)();
// Get game sessions by date range
router
    .route("/")
    .get(async (req, res, next) => {
    try {
        // Build query
        const { fromDate, toDate } = (0, functions_1.validateDates)(req);
        const query = {
            start: {
                $gte: fromDate,
                $lte: toDate,
            },
        };
        const gameSessions = await collections_1.GameSessions.find(query).toArray();
        res.status(200).json({ gameSessions });
        next();
    }
    catch (error) {
        next(error);
    }
})
    // Create new game session
    .post(validateRequest_1.adminCheck, validateRequest_1.validateNewGameSessionDate, async (req, res, next) => {
    if (typeof req.body.cost !== "number")
        throw new error_util_1.ApiError(400, "cost key must be of type number");
    const document = {
        _id: new mongodb_1.ObjectId(),
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        players: [],
        cost: req.body.cost,
        courts: req.body.courts,
        createdAt: new Date(),
        payTo: req.user.email,
    };
    try {
        const result = await collections_1.GameSessions.insertOne(document);
        res.status(201).json({ result, document });
        next();
    }
    catch (error) {
        next(error);
    }
})
    .patch(async (req, res, next) => {
    try {
        // Validate courts key
        if (!(req.body.courts instanceof Array))
            throw new error_util_1.ApiError(400, "courts key must be of type string[]");
        for (const elem of req.body.courts) {
            if (typeof elem !== "string")
                throw new error_util_1.ApiError(400, "courts key must be of type string[]");
        }
        if (typeof req.body.cost !== "number")
            throw new error_util_1.ApiError(400, "cost key must be of type number");
        // Update and return new document
        const result = await collections_1.GameSessions.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.body.sessionId) }, {
            $set: {
                start: new Date(req.body.start),
                end: new Date(req.body.end),
                cost: req.body.cost,
                payTo: req.body.payTo,
                courts: req.body.courts,
            },
        }, { returnDocument: "after" });
        if (result.value === null)
            throw new error_util_1.ApiError(404, "No session with that id");
        res.status(200).json({ result: result.value });
    }
    catch (error) {
        next(error);
    }
});
// Get game session by id
router.get("/:sessionId", async (req, res, next) => {
    try {
        const sessionId = req.params.sessionId;
        const gameSession = await collections_1.GameSessions.findOne({
            _id: new mongodb_1.ObjectId(sessionId),
        });
        if (!gameSession)
            throw new error_util_1.ApiError(404, "Game session with that id does not exist");
        res.status(200).json(gameSession);
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=game-sessions.js.map