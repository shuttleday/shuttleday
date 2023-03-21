import request from "supertest";
import app from "../../setup";
import { disconnectDb } from "../../db/connect";
import { Request, Response, NextFunction } from "express";
import * as functions from "../../utils/functions";
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
