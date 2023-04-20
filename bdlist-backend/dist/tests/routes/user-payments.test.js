"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const setup_1 = __importDefault(require("../../setup"));
const connect_1 = require("../../db/connect");
const api = (0, supertest_1.default)(setup_1.default);
// globally mock authenticate middleware
jest.mock("../../middleware/authenticate", () => {
    return {
        // use existing definitions for other functions
        ...jest.requireActual("../../middleware/authenticate"),
        // skip JWT auth
        authenticate: (req, res, next) => {
            req.user = { email: "yunjin@huh.com", username: "jenaissante" };
            next();
        },
    };
});
jest.mock("@aws-sdk/client-s3", () => {
    class MockS3 {
        send(_) {
            return { $metadata: { httpStatusCode: 200 } };
        }
    }
    return {
        ...jest.requireActual("@aws-sdk/client-s3"),
        S3Client: MockS3,
    };
});
// DB teardown so that Jest exits gracefully
afterAll(async () => await (0, connect_1.disconnectDb)());
describe("POST /user-payments", () => {
    it("returns the updated UserPayments object", async () => {
        // perform request
        const res = await api
            .post("/user-payments")
            .attach("receipt", __dirname + "/favicon.png")
            .field({ sessionId: "640972e1ab208acdf081d155" })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
            result: {
                paid: true,
                paidAt: expect.any(String),
                userEmail: "yunjin@huh.com",
                username: "jenaissante",
            },
        });
    });
    it("returns a 409 if they aren't in the session", async () => {
        // perform request
        const res = await api
            .post("/user-payments")
            .attach("receipt", __dirname + "/favicon.png")
            .field({ sessionId: "640972e1ab208acdf081d203" })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(409);
        expect(res.body).toMatchObject({
            error: "Either already paid for this session or not in session",
        });
    });
    it("returns a 409 if they already paid for this session", async () => {
        // perform request
        const res = await api
            .post("/user-payments")
            .attach("receipt", __dirname + "/favicon.png")
            .field({ sessionId: "640972e1ab208acdf081d069" })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(409);
        expect(res.body).toMatchObject({
            error: "Either already paid for this session or not in session",
        });
    });
    it("returns a 401 if no image is attached", async () => {
        // perform request
        const res = await api
            .post("/user-payments")
            .field({ sessionId: "640972e1ab208acdf081d069" })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(401);
        expect(res.body).toMatchObject({
            error: "No image was uploaded",
        });
    });
});
//# sourceMappingURL=user-payments.test.js.map