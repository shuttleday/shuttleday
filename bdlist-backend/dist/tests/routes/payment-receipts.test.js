"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const setup_1 = __importDefault(require("../../setup"));
const connect_1 = require("../../db/connect");
const api = (0, supertest_1.default)(setup_1.default);
jest.mock("@aws-sdk/s3-request-presigner", () => {
    return {
        ...jest.requireActual("@aws-sdk/s3-request-presigner"),
        getSignedUrl: () => "https://shuttleday-payments.s3.ap-southeast-1.amazonaws.com/sakura%40miyawaki.com/640972e1ab208acdf081d525/_chaechae_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=%2F20230321%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230321T110813Z&X-Amz-Expires=3600&X-Amz-Signature=12e99a2fa4ff9c308de65202c892754a2d0c89e21d3ee2cadea1f78d60854f0c&X-Amz-SignedHeaders=host&x-id=GetObject",
    };
});
// globally mock authenticate middleware
jest.mock("../../middleware/authenticate", () => {
    return {
        // use existing definitions for other functions
        ...jest.requireActual("../../middleware/authenticate"),
        // skip JWT auth
        authenticate: (req, res, next) => {
            req.user = {
                email: "sakura@miyawaki.com",
                username: "39saku_chan",
                userType: "admin",
            };
            next();
        },
    };
});
// DB teardown so that Jest exits gracefully
afterAll(async () => await (0, connect_1.disconnectDb)());
describe("GET /payment-receipts", () => {
    it("returns urls for players that have paid for the session", async () => {
        // perform request
        const res = await api
            .get("/payment-receipts")
            .query({ sessionId: "640972e1ab208acdf081d525" })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            signedUrls: [
                {
                    payer: "_chaechae_1",
                    signedUrl: "https://shuttleday-payments.s3.ap-southeast-1.amazonaws.com/sakura%40miyawaki.com/640972e1ab208acdf081d525/_chaechae_1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=%2F20230321%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230321T110813Z&X-Amz-Expires=3600&X-Amz-Signature=12e99a2fa4ff9c308de65202c892754a2d0c89e21d3ee2cadea1f78d60854f0c&X-Amz-SignedHeaders=host&x-id=GetObject",
                },
            ],
        });
    });
    it("returns a 404 if the passed in session does not exist", async () => {
        // perform request
        const res = await api
            .get("/payment-receipts")
            .query({
            sessionId: "640972e1ab208acdf081d000",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "No session under your account with that ID",
        });
    });
    it("returns a 404 if the passed in session does not belong to the caller", async () => {
        // perform request
        const res = await api
            .get("/payment-receipts")
            .query({
            sessionId: "640972e1ab208acdf081d025",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "No session under your account with that ID",
        });
    });
    it("returns a 404 if none of the players have paid", async () => {
        // perform request
        const res = await api
            .get("/payment-receipts")
            .query({
            sessionId: "640972e1ab208acdf081d139",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "No players have paid for that session",
        });
    });
});
//# sourceMappingURL=payment-receipts.test.js.map