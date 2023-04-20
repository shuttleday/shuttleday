"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const mongodb_1 = require("mongodb");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const functions_1 = require("../utils/functions");
const collections_1 = require("../db/collections");
const validateRequest_1 = require("../middleware/validateRequest");
const error_util_1 = require("../utils/error-util");
const router = (0, express_1.Router)();
// Upload payment receipt and update payment status
router.post("/", (0, express_fileupload_1.default)(), validateRequest_1.validateFileUpload, validateRequest_1.fileSizeLimiter, async (req, res, next) => {
    try {
        const result = await collections_1.GameSessions.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(req.body.sessionId),
            players: {
                $elemMatch: {
                    userEmail: req.user.email,
                    paidAt: null,
                    paid: false,
                },
            },
        }, {
            $set: {
                "players.$.paid": true,
                "players.$.paidAt": new Date(),
            },
        }, { returnDocument: "after" });
        if (result.value === null)
            throw new error_util_1.ApiError(409, "Either already paid for this session or not in session");
        const modified = result.value.players?.find((user) => user.userEmail === req.user.email);
        // Upload files to S3
        const file = (0, functions_1.processUploadedFiles)(req.files);
        const filename = `${result.value.payTo}/${result.value._id}/${req.user.username}.jpg`;
        const bucketParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: filename,
            Body: file.data,
        };
        const data = await functions_1.s3.send(new client_s3_1.PutObjectCommand(bucketParams));
        // Rollback db write if s3 upload fails
        if (data.$metadata.httpStatusCode !== 200) {
            await collections_1.GameSessions.updateOne({
                _id: new mongodb_1.ObjectId(req.body.sessionId),
                players: { userEmail: req.user.email },
            }, {
                $set: { "players.$.paid": false },
                $unset: { "players.$.paidAt": "" },
            });
            throw new Error("Could not upload to S3");
        }
        res.status(201).json({ result: modified });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=user-payments.js.map