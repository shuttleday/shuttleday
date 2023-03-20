import request from "supertest";
import app from "../setup";
import { disconnectDb } from "../db/connect";
import { NextFunction } from "express";
const api = request(app);

// mock validateGJwt on a per test basis
// https://dev.to/wolfhoundjesse/comment/lj50
import * as functions from "../utils/functions";

// globally mock authenticate middleware
jest.mock("../middleware/authenticate", () => {
  return {
    // use existing definitions for other functions
    ...jest.requireActual("../middleware/authenticate"),
    // skip JWT auth
    authenticate: (req: Request, res: Response, next: NextFunction) => next(),
  };
});

const userTeh = {
  _id: "6416dfe71b2a978617f9c27f",
  email: "tehyeuhaw@gmail.com",
  firstName: "Yeu Haw",
  lastName: "Teh",
  username: "Kirix",
  createdAt: "2023-03-19T10:11:51.693Z",
  userType: "player",
};

const userPie = {
  _id: "6416dd3f1fa5f32e354bfc02",
  email: "contact@pierreccesario.com",
  firstName: "Pierre",
  lastName: "Cesario",
  username: "PScoriae",
  createdAt: "2023-03-19T10:00:31.171Z",
  userType: "player",
};

const userYunjin = {
  _id: "6416e081090bb857e3384aa3",
  email: "yunjin@huh.com",
  firstName: "Yunjin",
  lastName: "Huh",
  username: "jenaissante",
  createdAt: "2023-03-19T10:00:31.171Z",
  userType: "admin",
};

// DB teardown so that Jest exits gracefully
afterAll(() => disconnectDb());

describe("POST /users", () => {
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
      .post("/users")
      .send({
        username: "_chaechae_1",
      })
      .expect("Content-Type", /json/);

    // validation
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(
      expect.objectContaining({
        result: expect.objectContaining({
          acknowledged: true,
          insertedId: expect.any(String),
        }),
        document: expect.objectContaining({
          _id: expect.any(String),
          email: "chaewon@kim.com",
          firstName: "Chaewon",
          lastName: "Kim",
          username: "_chaechae_1",
          createdAt: expect.any(String),
          userType: "player",
        }),
      })
    );
    expect(validateGJwtMock).toHaveBeenCalled();
  });
});

describe("GET /users/:email", () => {
  it("returns user based on email param", async () => {
    const res = await api
      .get("/users/tehyeuhaw@gmail.com")
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(userTeh);
  });

  it("returns 404 if user with that email does not exist", async () => {
    const res = await api
      .get("/users/sakura@miyawaki.com")
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      error: "User with that email does not exist",
    });
  });
});

describe("GET /users", () => {
  it("returns list of users", async () => {
    const res = await api.get("/users").expect("Content-Type", /json/);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        result: expect.arrayContaining([userPie, userTeh, userYunjin]),
      })
    );
  });
});
