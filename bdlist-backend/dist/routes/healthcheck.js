"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Healthcheck for API service
router.get("/", (req, res, next) => {
    // Must be sendStatus or else it breaks the route.
    res.sendStatus(200);
    next();
});
exports.default = router;
//# sourceMappingURL=healthcheck.js.map