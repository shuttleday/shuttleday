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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const functions = __importStar(require("../../utils/functions"));
describe("JWT functions", () => {
    it("returns a new access token from a User object", () => {
        const expected = {
            email: "someemail@email.com",
            firstName: "Eunchae",
            lastName: "Hong",
            username: "hhh.e_c.v",
            userType: "player",
        };
        const input = {
            ...expected,
            _id: new mongodb_1.ObjectId("64194988c71c8267ab8c8777"),
            createdAt: new Date("2023-03-11T06:35:46.000Z"),
            accessToken: "sometoken",
            refreshToken: "someothertoken",
        };
        const output = functions.genAccessToken(input);
        expect(typeof output).toBe("string");
        expect(output.startsWith("eyJhbG")).toBe(true);
    });
    it("returns the decoded JWT token", () => {
        const output = functions.verifyAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVlbWFpbEBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJFdW5jaGFlIiwibGFzdE5hbWUiOiJIb25nIiwidXNlcm5hbWUiOiJoaGguZV9jLnYiLCJ1c2VyVHlwZSI6InBsYXllciIsImlhdCI6MTY3OTM5MzM2OCwiZXhwIjoxNjgxOTg1MzY4fQ.jdLHv-gTp-aSlsX4oUQrCJF07SkNmcVHy2Q-DMn_jkI");
        expect(output).toMatchObject({
            email: "someemail@email.com",
            firstName: "Eunchae",
            lastName: "Hong",
            username: "hhh.e_c.v",
            userType: "player",
            iat: 1679393368,
            exp: 1681985368,
        });
    });
});
//# sourceMappingURL=functions.test.js.map