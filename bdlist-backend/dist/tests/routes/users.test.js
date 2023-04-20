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
// mock validateGJwt on a per test basis
// https://dev.to/wolfhoundjesse/comment/lj50
const functions = __importStar(require("../../utils/functions"));
// globally mock authenticate middleware
jest.mock("../../middleware/authenticate", () => {
    return {
        // use existing definitions for other functions
        ...jest.requireActual("../../middleware/authenticate"),
        // skip JWT auth
        authenticate: (req, res, next) => next(),
    };
});
const userTeh = {
    _id: "6416dfe71b2a978617f9c27f",
    email: "tehyeuhaw@gmail.com",
    firstName: "Yeu Haw",
    lastName: "Teh",
    username: "Kirix",
    createdAt: "2023-03-19T10:11:51.693Z",
    userType: "player",
};
const userPie = {
    _id: "6416dd3f1fa5f32e354bfc02",
    email: "contact@pierreccesario.com",
    firstName: "Pierre",
    lastName: "Cesario",
    username: "PScoriae",
    createdAt: "2023-03-19T10:00:31.171Z",
    userType: "player",
};
const userYunjin = {
    _id: "6416e081090bb857e3384aa3",
    email: "yunjin@huh.com",
    firstName: "Yunjin",
    lastName: "Huh",
    username: "jenaissante",
    createdAt: "2023-03-19T10:00:31.171Z",
    userType: "admin",
};
// DB teardown so that Jest exits gracefully
afterAll(async () => await (0, connect_1.disconnectDb)());
describe("POST /users", () => {
    it("returns a newly created user", async () => {
        // mock return value for this specific test
        const validateGJwtMock = jest
            .spyOn(functions, "validateGJwt")
            .mockResolvedValueOnce({
            email: "chaewon@kim.com",
            given_name: "Chaewon",
            family_name: "Kim",
            iss: "hi",
            sub: "sldfjds",
            exp: 239480392843,
            aud: "sldfj;sdf",
            iat: 230480234,
        });
        // perform request
        const res = await api
            .post("/users")
            .send({
            username: "_chaechae_1",
        })
            .expect("Content-Type", /json/);
        // validation
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(expect.objectContaining({
            result: expect.objectContaining({
                acknowledged: true,
                insertedId: expect.any(String),
            }),
            document: expect.objectContaining({
                _id: expect.any(String),
                email: "chaewon@kim.com",
                firstName: "Chaewon",
                lastName: "Kim",
                username: "_chaechae_1",
                createdAt: expect.any(String),
                userType: "player",
            }),
        }));
        expect(validateGJwtMock).toHaveBeenCalled();
    });
});
describe("GET /users/:email", () => {
    it("returns user based on email param", async () => {
        const res = await api
            .get("/users/tehyeuhaw@gmail.com")
            .expect("Content-Type", /json/);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(userTeh);
    });
    it("returns 404 if user with that email does not exist", async () => {
        const res = await api
            .get("/users/sakura@miyawaki.com")
            .expect("Content-Type", /json/);
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({
            error: "User with that email does not exist",
        });
    });
});
describe("GET /users", () => {
    it("returns list of users", async () => {
        const res = await api.get("/users").expect("Content-Type", /json/);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({
            result: expect.arrayContaining([userPie, userTeh, userYunjin]),
        }));
    });
});
//# sourceMappingURL=users.test.js.map