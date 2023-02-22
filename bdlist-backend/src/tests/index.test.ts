import request from "supertest";
import app from "../index";
const api = request(app);

describe("GET /healthcheck", () => {
  it("should return a 200 OK", async () => {
    const res = await api.get("/healthcheck");

    expect(res.statusCode).toBe(200);
  });
});
