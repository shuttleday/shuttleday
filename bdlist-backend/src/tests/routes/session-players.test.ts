import request from "supertest";
import app from "../../setup.js";
import { disconnectDb } from "../../db/connect.js";
import { NextFunction, Request, Response } from "express";
const api = request(app);

import { User } from "../../db/interfaces.js";

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

// DB teardown so that Jest exits gracefully
afterAll(async () => await disconnectDb());

describe("POST /session-players", () => {
  it("returns the newly updated list of players if not already inside", async () => {
    // perform request
    const res = await api
      .post("/session-players")
      .send({
        sessionId: "640972e1ab208acdf081d011",
      })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      players: [
        {
          userEmail: "kazuha@nakamura.com",
          username: "k_a_z_u_h_a__",
          paid: false,
          paidAt: null,
        },
        {
          userEmail: "yunjin@huh.com",
          username: "jenaissante",
          paid: false,
          paidAt: null,
        },
      ],
    });
  });

  it("returns a 409 if already inside", async () => {
    // perform request
    const res = await api
      .post("/session-players")
      .send({
        sessionId: "640972e1ab208acdf081d011",
      })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(409);
    expect(res.body).toMatchObject({ error: "Already added to this session" });
  });
});

describe("DELETE /session-players", () => {
  it("returns the newly updated list of players if not already inside", async () => {
    // perform request
    const res = await api
      .delete("/session-players")
      .send({
        sessionId: "640972e1ab208acdf081d025",
      })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      players: [],
    });
  });

  it("returns a 404 if not in the session", async () => {
    // perform request
    const res = await api
      .delete("/session-players")
      .send({
        sessionId: "63fa27430e3ade06b7a244eb",
      })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({ error: "User is not in this session" });
  });
});
