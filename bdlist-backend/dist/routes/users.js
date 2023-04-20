"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collections_1 = require("../db/collections");
const error_util_1 = require("../utils/error-util");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Get user object from email
router.get("/:email", async (req, res, next) => {
    try {
        const email = req.params.email;
        const user = await collections_1.Users.findOne({ email });
        if (!user)
            throw new error_util_1.ApiError(404, "User with that email does not exist");
        res.status(200).json(user);
        next();
    }
    catch (error) {
        next(error);
    }
});
router
    .route("/")
    // Get all users
    .get(validateRequest_1.adminCheck, async (req, res, next) => {
    try {
        const result = await collections_1.Users.find().toArray();
        res.status(200).json({ result });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map