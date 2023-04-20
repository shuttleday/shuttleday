"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const setup_1 = __importDefault(require("../../setup"));
const api = (0, supertest_1.default)(setup_1.default);
describe("GET /healthcheck", () => {
    it("returns a 200 OK", async () => {
        const res = await api.get("/healthcheck");
        expect(res.statusCode).toBe(200);
    });
});
//# sourceMappingURL=healthcheck.test.js.map