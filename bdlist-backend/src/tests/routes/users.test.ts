import request from "supertest";
import app from "../../setup.js";
import { disconnectDb } from "../../db/connect.js";
import { NextFunction } from "express";
import { Request } from "express";
import { UserType } from "../../db/interfaces.js";
import { ObjectId } from "mongodb";
const api = request(app);

// globally mock authenticate middleware
jest.mock("../../middleware/authenticate", () => {
  return {
    // use existing definitions for other functions
    ...jest.requireActual("../../middleware/authenticate"),
    // skip JWT auth
    authenticate: (req: Request, res: Response, next: NextFunction) => {
      req.user = {
        _id: new ObjectId(),
        email: "test@email.com",
        firstName: "HI",
        lastName: "Hello",
        username: "peepoo",
        createdAt: new Date(),
        userType: UserType.Admin,
        hasQR: true,
      };
      next();
    },
  };
});

const userTeh = {
  _id: "6416dfe71b2a978617f9c27f",
  email: "tehyeuhaw@gmail.com",
  firstName: "Yeu Haw",
  lastName: "Teh",
  username: "Kirix",
  createdAt: "2023-03-19T10:11:51.693Z",
  userType: "PLAYER",
};

const userPie = {
  _id: "6416dd3f1fa5f32e354bfc02",
  email: "contact@pierreccesario.com",
  firstName: "Pierre",
  lastName: "Cesario",
  username: "PScoriae",
  createdAt: "2023-03-19T10:00:31.171Z",
  userType: "PLAYER",
};

const userYunjin = {
  _id: "6416e081090bb857e3384aa3",
  email: "yunjin@huh.com",
  firstName: "Yunjin",
  lastName: "Huh",
  username: "jenaissante",
  createdAt: "2023-03-19T10:00:31.171Z",
  userType: "ADMIN",
};

// DB teardown so that Jest exits gracefully
afterAll(async () => await disconnectDb());

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
