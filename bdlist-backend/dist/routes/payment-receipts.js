"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const functions_1 = require("../utils/functions");
const validateRequest_1 = require("../middleware/validateRequest");
const collections_1 = require("../db/collections");
const mongodb_1 = require("mongodb");
const error_util_1 = require("../utils/error-util");
const router = (0, express_1.Router)();
router.get("/", validateRequest_1.adminCheck, async (req, res, next) => {
    try {
        // Get session
        const gameSession = await collections_1.GameSessions.findOne({
            _id: new mongodb_1.ObjectId(req.query.sessionId),
            payTo: req.user.email,
        });
        if (!gameSession)
            throw new error_util_1.ApiError(404, "No session under your account with that ID");
        // Get only players that paid for that session
        const players = gameSession.players.filter((player) => {
            return player.paid === true && player.paidAt !== null;
        });
        // Ensure there are players that paid
        if (players.length === 0)
            throw new error_util_1.ApiError(404, "No players have paid for that session");
        // Construct promises
        const promises = players.map((player) => {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `${req.user.email}/${gameSession._id}/${player.username}.jpg`,
            });
            return (0, s3_request_presigner_1.getSignedUrl)(functions_1.s3, command, { expiresIn: 3600 });
        });
        // Get presigned urls asynchronously
        const urls = await Promise.all(promises);
        // Parse filenames from URLs
        const urlObjs = urls.map((signedUrl) => {
            const url = new URL(signedUrl);
            const pathname = url.pathname;
            const decodedPath = decodeURIComponent(pathname);
            const filename = decodedPath.split("/")[3];
            const username = filename.split(".")[0];
            return { payer: username, signedUrl };
        });
        res.status(200).json({ signedUrls: urlObjs });
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=payment-receipts.js.map