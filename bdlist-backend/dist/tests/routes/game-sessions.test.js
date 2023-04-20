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
const api = (0, supertest_1.default)(setup_1.default);
const functions = __importStar(require("../../utils/functions"));
jest.mock("../../middleware/authenticate", () => {
    return {
        // use existing definitions for other functions
        ...jest.requireActual("../../middleware/authenticate"),
        // skip JWT auth
        authenticate: (req, res, next) => {
            req.user = { userType: "admin" };
            next();
        },
    };
});
const gameSessions = [
    {
        _id: "63f873eb06409eab241847ed",
        start: "2023-03-11T06:35:46.000Z",
        end: "2023-03-11T08:35:46.000Z",
        players: [
            {
                userEmail: "tehyeuhaw@gmail.com",
                username: "Kirix",
                paid: true,
                paidAt: "2023-02-27T15:58:14.987Z",
            },
            {
                userEmail: "contact@pierreccesario.com",
                username: "PScoriae",
                paid: false,
                paidAt: null,
            },
            {
                userEmail: "yunjin@huh.com",
                username: "jenaissante",
                paid: false,
                paidAt: null,
            },
        ],
        cost: 26,
        courts: ["1", "2"],
        createdAt: "2023-02-24T08:23:07.856Z",
        payTo: "yunjin@huh.com",
    },
    {
        _id: "63fa27430e3ade06b7a244eb",
        start: "2023-03-15T10:35:46.000Z",
        end: "2023-03-15T12:35:46.000Z",
        players: [],
        cost: 60,
        courts: ["5", "6"],
        createdAt: "2023-02-25T15:20:35.600Z",
        payTo: "yunjin@huh.com",
    },
];
const gameSessions2 = [
    {
        _id: "63f873eb06409eab241847ed",
        start: "2023-03-11T06:35:46.000Z",
        end: "2023-03-11T08:35:46.000Z",
        players: [
            {
                userEmail: "tehyeuhaw@gmail.com",
                username: "Kirix",
                paid: true,
                paidAt: "2023-02-27T15:58:14.987Z",
            },
            {
                userEmail: "contact@pierreccesario.com",
                username: "PScoriae",
                paid: false,
                paidAt: null,
            },
            {
                userEmail: "yunjin@huh.com",
                username: "jenaissante",
                paid: false,
                paidAt: null,
            },
        ],
        cost: 26,
        courts: ["1", "2"],
        createdAt: "2023-02-24T08:23:07.856Z",
        payTo: "yunjin@huh.com",
    },
];
// DB teardown so that Jest exits gracefully
afterAll(async () => await (0, connect_1.disconnectDb)());
describe("GET /game-sessions", () => {
    it("returns appropriate game sessions in the default range for fromDate and toDate", async () => {
        // mock default 14 day range
        const validateDatesMock = jest
            .spyOn(functions, "validateDates")
            .mockReturnValueOnce({
            fromDate: new Date("2023-03-10T06:35:46.000Z"),
            toDate: new Date("2023-03-24T06:35:46.000Z"),
        });
        // perform request
        const res = await api.get("/game-sessions").expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({ gameSessions });
        expect(validateDatesMock).toHaveBeenCalled();
    });
    it("returns appropriate game sessions when provided valid fromDate and toDate", async () => {
        // perform request
        const res = await api
            .get("/game-sessions")
            .query({
            fromDate: "2023-03-25T06:35:46.000Z",
            toDate: "2023-03-30T06:35:46.000Z",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            gameSessions: [
                {
                    _id: "640972e1ab208acdf081d294",
                    start: "2023-03-29T06:35:46.000Z",
                    end: "2023-03-29T07:35:46.000Z",
                    players: [
                        {
                            userEmail: "contact@pierreccesario.com",
                            username: "PScoriae",
                            paid: false,
                            paidAt: null,
                        },
                        {
                            userEmail: "yunjin@huh.com",
                            username: "jenaissante",
                            paid: false,
                            paidAt: null,
                        },
                    ],
                    cost: 0,
                    courts: ["1"],
                    createdAt: "2023-03-09T05:47:13.786Z",
                    payTo: "yunjin@huh.com",
                },
            ],
        });
    });
    it("returns no game sessions when fromDate and toDate are out of range", async () => {
        // perform request
        const res = await api
            .get("/game-sessions")
            .query({
            fromDate: "2023-01-01T06:35:46.000Z",
            toDate: "2023-01-12T06:35:46.000Z",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            gameSessions: [],
        });
    });
    it("returns a 400 if the toDate is before the fromDate", async () => {
        // perform request
        const res = await api
            .get("/game-sessions")
            .query({
            fromDate: "2023-03-01T06:35:46.000Z",
            toDate: "2023-01-12T06:35:46.000Z",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject({
            error: "toDate cannot be before fromDate",
        });
    });
    it("returns the results between fromDate and now + 7 days if only fromDate is provided", async () => {
        // mock default 14 day range
        const validateDatesMock = jest
            .spyOn(functions, "validateDates")
            .mockImplementationOnce((req) => {
            const toDate = new Date("2023-03-12T06:35:46.000Z");
            const fromDate = new Date(req.query.fromDate);
            return { fromDate, toDate };
        });
        // perform request
        const res = await api
            .get("/game-sessions")
            .query({
            fromDate: "2023-03-01T06:35:46.000Z",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            gameSessions: gameSessions2,
        });
        expect(validateDatesMock).toHaveBeenCalled();
    });
    it("returns the results between toDate and now - 7 days if only toDate is provided", async () => {
        // mock default 14 day range
        const validateDatesMock = jest
            .spyOn(functions, "validateDates")
            .mockImplementationOnce((req) => {
            const fromDate = new Date("2023-03-10T06:35:46.000Z");
            const toDate = new Date(req.query.toDate);
            return { fromDate, toDate };
        });
        // perform request
        const res = await api
            .get("/game-sessions")
            .query({
            toDate: "2023-03-12T06:35:46.000Z",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            gameSessions: gameSessions2,
        });
        expect(validateDatesMock).toHaveBeenCalled();
    });
});
describe("GET /game-sessions/:sessionId", () => {
    it("returns the correct session", async () => {
        const res = await api
            .get("/game-sessions/640972e1ab208acdf081d294")
            .expect("Content-Type", /json/);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            _id: "640972e1ab208acdf081d294",
            start: "2023-03-29T06:35:46.000Z",
            end: "2023-03-29T07:35:46.000Z",
            players: [
                {
                    userEmail: "contact@pierreccesario.com",
                    username: "PScoriae",
                    paid: false,
                    paidAt: null,
                },
                {
                    userEmail: "yunjin@huh.com",
                    username: "jenaissante",
                    paid: false,
                    paidAt: null,
                },
            ],
            cost: 0,
            courts: ["1"],
            createdAt: "2023-03-09T05:47:13.786Z",
            payTo: "yunjin@huh.com",
        });
    });
    it("returns a 404 if no session with that id is found", async () => {
        const res = await api
            .get("/game-sessions/640972e1ab208acdf081d190")
            .expect("Content-Type", /json/);
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "Game session with that id does not exist",
        });
    });
});
describe("PATCH /game-sessions", () => {
    it("returns updated game session if sent a valid body and sessionId", async () => {
        const data = {
            start: "2023-03-25T06:35:46.000Z",
            end: "2023-03-26T06:35:46.000Z",
            cost: 28,
            payTo: "yunjin@huh.com",
            courts: ["1"],
        };
        const patchToSend = {
            sessionId: "640972e1ab208acdf081d299",
            ...data,
        };
        const objectToReceive = {
            _id: "640972e1ab208acdf081d299",
            ...data,
        };
        const res = await api
            .patch("/game-sessions")
            .send(patchToSend)
            .expect("Content-Type", /json/);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({ result: objectToReceive });
    });
    it("returns 404 if game session with that id doesn't exist", async () => {
        const patchToSend = {
            sessionId: "640972e1ab208acdf081d900",
            start: "2023-03-25T06:35:46.000Z",
            end: "2023-03-26T06:35:46.000Z",
            cost: 28,
            payTo: "yunjin@huh.com",
            courts: ["1"],
        };
        const res = await api
            .patch("/game-sessions")
            .send(patchToSend)
            .expect("Content-Type", /json/);
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "No session with that id",
        });
    });
});
//# sourceMappingURL=game-sessions.test.js.map