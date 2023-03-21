import request from "supertest";
import app from "../../setup";
import { disconnectDb } from "../../db/connect";
import { NextFunction, Request, Response } from "express";
const api = request(app);

import { User } from "../../db/interfaces";

// globally mock authenticate middleware
jest.mock("../../middleware/authenticate", () => {
  return {
    // use existing definitions for other functions
    ...jest.requireActual("../../middleware/authenticate"),
    // skip JWT auth
    authenticate: (req: Request, res: Response, next: NextFunction) => {
      req.user = { email: "yunjin@huh.com", username: "jenaissante" } as User;
      next();
    },
  };
});

jest.mock("@aws-sdk/client-s3", () => {
  class MockS3 {
    send(_: any) {
      return { $metadata: { httpStatusCode: 200 } };
    }
  }
  return {
    ...jest.requireActual("@aws-sdk/client-s3"),
    S3Client: MockS3,
  };
});

// DB teardown so that Jest exits gracefully
afterAll(async () => await disconnectDb());

describe("POST /user-payments", () => {
  it("returns the updated UserPayments object", async () => {
    // perform request
    const res = await api
      .post("/user-payments")
      .attach("receipt", __dirname + "/favicon.png")
      .field({ sessionId: "640972e1ab208acdf081d155" })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      result: {
        paid: true,
        paidAt: expect.any(String),
        userEmail: "yunjin@huh.com",
        username: "jenaissante",
      },
    });
  });

  it("returns a 409 if they aren't in the session", async () => {
    // perform request
    const res = await api
      .post("/user-payments")
      .attach("receipt", __dirname + "/favicon.png")
      .field({ sessionId: "640972e1ab208acdf081d203" })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(409);
    expect(res.body).toMatchObject({
      error: "Either already paid for this session or not in session",
    });
  });

  it("returns a 409 if they already paid for this session", async () => {
    // perform request
    const res = await api
      .post("/user-payments")
      .attach("receipt", __dirname + "/favicon.png")
      .field({ sessionId: "640972e1ab208acdf081d069" })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(409);
    expect(res.body).toMatchObject({
      error: "Either already paid for this session or not in session",
    });
  });
});
