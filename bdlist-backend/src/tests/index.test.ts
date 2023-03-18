import request from "supertest";
import app from "../setup";
import { connectDb, disconnectDb } from "../db/connect";
const api = request(app);

jest.mock("../utils/functions", () => {
  return {
    // use existing definitions for other functions
    ...jest.requireActual("../utils/functions"),
    // mock Google API call
    validateGJwt: () => {
      return {
        email: "tehyeuhaw@gmail.com",
      };
    },
  };
});

// DB teardown so that Jest exits gracefully
afterAll(() => disconnectDb());

describe("GET /healthcheck", () => {
  it("returns a 200 OK", async () => {
    const res = await api.get("/healthcheck");

    expect(res.statusCode).toBe(200);
  });
});

describe("POST /auth/signin", () => {
  it("returns an accessToken and refreshToken when a valid Google JWT is provided", async () => {
    const res = await api.post("/auth/signin").expect("Content-Type", /json/);

    expect(res.statusCode).toBe(201);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});
