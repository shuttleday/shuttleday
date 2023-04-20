"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePATCH = exports.validateGET = exports.validatePOST = exports.fileSizeLimiter = exports.validateFileUpload = exports.adminCheck = exports.validateNewGameSessionDate = void 0;
const functions_1 = require("../utils/functions");
const validation_1 = require("./validation");
const error_util_1 = require("../utils/error-util");
const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;
async function validateNewGameSessionDate(req, res, next) {
    try {
        const sessionDate = new Date(req.body.start);
        if (sessionDate < new Date())
            throw new error_util_1.ApiError(400, "Cannot create session in the past");
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.validateNewGameSessionDate = validateNewGameSessionDate;
async function adminCheck(req, res, next) {
    try {
        if (req.user.userType !== "admin")
            throw new error_util_1.ApiError(403, "You must be an admin to access this resource");
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.adminCheck = adminCheck;
function validateFileUpload(req, res, next) {
    try {
        if (!req.files)
            throw new error_util_1.ApiError(401, "No image was uploaded");
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.validateFileUpload = validateFileUpload;
function fileSizeLimiter(req, res, next) {
    try {
        const file = (0, functions_1.processUploadedFiles)(req.files);
        if (file.size > FILE_SIZE_LIMIT)
            throw new error_util_1.ApiError(413, `Uploaded file is over the file size limit of ${MB} MB`);
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.fileSizeLimiter = fileSizeLimiter;
async function validateMethod(method, requiredKeys, req, res, next) {
    try {
        // Return early if not the expected method
        if (req.method !== method)
            return next();
        // Get required keys
        const target = getTargetKeys(requiredKeys, req);
        if (!target)
            return next(); // Return early if there are no targets
        // Get missing keys
        const missing = getMissingKeys(target[1], req);
        // Return 400 with dynamic error message if there are missing keys
        if (missing.length > 0)
            throwMissingKeysError(missing);
        next();
    }
    catch (error) {
        next(error);
    }
}
async function validatePOST(req, res, next) {
    await validateMethod("POST", validation_1.requiredPOST, req, res, next);
}
exports.validatePOST = validatePOST;
async function validateGET(req, res, next) {
    await validateMethod("GET", validation_1.requiredGET, req, res, next);
}
exports.validateGET = validateGET;
async function validatePATCH(req, res, next) {
    await validateMethod("PATCH", validation_1.requiredPATCH, req, res, next);
}
exports.validatePATCH = validatePATCH;
function throwMissingKeysError(missing) {
    const missingKeys = formatError(missing);
    throw new error_util_1.ApiError(400, `Missing keys:${missingKeys}`);
}
function getTargetKeys(requiredKeys, req) {
    // Get required req.query keys
    const required = Object.entries(requiredKeys);
    let endpoint;
    switch (req.method) {
        case "GET":
            endpoint = req.baseUrl;
            break;
        default:
            endpoint = req.path;
            break;
    }
    return required.find((path) => path[0] === endpoint);
}
function formatError(missing) {
    let missingKeys = "";
    missing.forEach((word, index) => {
        if (index !== missing.length - 1)
            missingKeys = `${missingKeys} ${word},`;
        else
            missingKeys = `${missingKeys} ${word}`;
    });
    return missingKeys;
}
function getMissingKeys(target, req) {
    const supplied = Object.keys(req.body);
    const missing = [];
    target.forEach((reqKey) => {
        if (!supplied.includes(reqKey))
            missing.push(reqKey);
    });
    return missing;
}
//# sourceMappingURL=validateRequest.js.map