import request from "supertest";
import app from "../setup";
import { disconnectDb } from "db/connect";
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

const userTeh = {
  _id: "6409e4e951c746ea65dbbdb2",
  email: "tehyeuhaw@gmail.com",
  firstName: "Teh",
  lastName: "Yeu Haw",
  username: "mikelu2",
  createdAt: "2023-03-09T13:53:45.712Z",
  userType: "player",
};

const userPie = {
  _id: "63ff3dbc757fd747d400abc5",
  email: "test@email.com",
  firstName: "pie",
  lastName: "tie",
  username: "mikelu2",
  createdAt: "2023-03-01T11:57:48.725Z",
  userType: "admin",
};

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

describe("GET /users/:email", () => {
  it("returns user based on email param", async () => {
    const res = await api
      .get("/users/tehyeuhaw@gmail.com")
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(userTeh);
  });
});

describe("GET /users/", () => {
  it("returns list of users", async () => {
    const res = await api.get("/users").expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      result: [userPie, userTeh],
    });
  });
});
