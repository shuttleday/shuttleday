import request from "supertest";
import app from "../../setup.js";
import version from "../../version.json";
const api = request(app);

describe("GET /healthcheck", () => {
  it("returns a 200 OK and the current version number", async () => {
    const res = await api.get("/healthcheck");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(version);
  });
});
