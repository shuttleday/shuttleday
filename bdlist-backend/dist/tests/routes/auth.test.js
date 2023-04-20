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
const supertest_1 = __importDefault(require("supertest"));
const setup_1 = __importDefault(require("../../setup"));
const connect_1 = require("../../db/connect");
const functions = __importStar(require("../../utils/functions"));
const api = (0, supertest_1.default)(setup_1.default);
jest.mock("../../middleware/authenticate", () => {
    return {
        // use existing definitions for other functions
        ...jest.requireActual("../../middleware/authenticate"),
        // skip JWT auth
        authenticate: (req, res, next) => next(),
    };
});
// DB teardown so that Jest exits gracefully
afterAll(async () => await (0, connect_1.disconnectDb)());
describe("POST /auth/signin", () => {
    it("returns an accessToken and refreshToken when a valid Google JWT is provided", async () => {
        const validateGJwtMock = jest
            .spyOn(functions, "validateGJwt")
            .mockResolvedValueOnce({ email: "tehyeuhaw@gmail.com" });
        const res = await api.post("/auth/signin").expect("Content-Type", /json/);
        expect(res.statusCode).toBe(201);
        expect(typeof res.body.accessToken).toBe("string");
        expect(typeof res.body.refreshToken).toBe("string");
        expect(validateGJwtMock).toHaveBeenCalled();
    });
    it("returns a 404 when no user with that email exists", async () => {
        const validateGJwtMock = jest
            .spyOn(functions, "validateGJwt")
            .mockResolvedValueOnce({ email: "weird@email.com" });
        const res = await api.post("/auth/signin").expect("Content-Type", /json/);
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({ error: "No user with that email" });
        expect(validateGJwtMock).toHaveBeenCalled();
    });
});
//# sourceMappingURL=auth.test.js.map