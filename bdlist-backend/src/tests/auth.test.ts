import request from "supertest";
import app from "../setup";
import { disconnectDb } from "../db/connect";
import { Request, Response, NextFunction } from "express";
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
    verifyRefreshToken: () => {
      return {
        email: "tehyeuhaw@gmail.com",
      };
    },
  };
});

jest.mock("../middleware/authenticate", () => {
  return {
    // use existing definitions for other functions
    ...jest.requireActual("../middleware/authenticate"),
    // skip JWT auth
    authenticate: (req: Request, res: Response, next: NextFunction) => next(),
  };
});

// DB teardown so that Jest exits gracefully
afterAll(() => disconnectDb());

describe("POST /auth/signin", () => {
  it("returns an accessToken and refreshToken when a valid Google JWT is provided", async () => {
    const res = await api.post("/auth/signin").expect("Content-Type", /json/);

    expect(res.statusCode).toBe(201);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});
