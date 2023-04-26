import request from "supertest";
import app from "../../setup.js";
import { disconnectDb } from "../../db/connect.js";
import { Request, Response, NextFunction } from "express";
import * as functions from "../../utils/functions.js";
import { TokenPayload } from "google-auth-library";
const api = request(app);

jest.mock("../../middleware/authenticate", () => {
  return {
    // use existing definitions for other functions
    ...jest.requireActual("../../middleware/authenticate"),
    // skip JWT auth
    authenticate: (req: Request, res: Response, next: NextFunction) => next(),
  };
});

// DB teardown so that Jest exits gracefully
afterAll(async () => await disconnectDb());

describe("POST /auth/signin", () => {
  it("returns an accessToken and refreshToken when a valid Google JWT is provided", async () => {
    const validateGJwtMock = jest
      .spyOn(functions, "validateGJwt")
      .mockResolvedValueOnce({ email: "tehyeuhaw@gmail.com" } as TokenPayload);

    const res = await api.post("/auth/signin").expect("Content-Type", /json/);

    expect(res.statusCode).toBe(201);
    expect(typeof res.body.accessToken).toBe("string");
    expect(typeof res.body.refreshToken).toBe("string");
    expect(validateGJwtMock).toHaveBeenCalled();
  });

  it("returns a 404 when no user with that email exists", async () => {
    const validateGJwtMock = jest
      .spyOn(functions, "validateGJwt")
      .mockResolvedValueOnce({ email: "weird@email.com" } as TokenPayload);

    const res = await api.post("/auth/signin").expect("Content-Type", /json/);

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ error: "No user with that email" });
    expect(validateGJwtMock).toHaveBeenCalled();
  });
});

describe("POST /auth/register", () => {
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
      .post("/auth/register")
      .send({
        username: "_chaechae_1",
      })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          email: "chaewon@kim.com",
          firstName: "Chaewon",
          lastName: "Kim",
          username: "_chaechae_1",
          createdAt: expect.any(String),
          userType: "PLAYER",
        }),
      })
    );
    expect(validateGJwtMock).toHaveBeenCalled();
  });
});
