import request from "supertest";
import app from "../../setup.js";
const api = request(app);

describe("GET /healthcheck", () => {
  it("returns a 200 OK and the current version number", async () => {
    const res = await api.get("/healthcheck");

    expect(res.statusCode).toBe(200);
  });
});
