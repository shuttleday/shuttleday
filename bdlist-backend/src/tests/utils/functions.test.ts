import { ObjectId } from "mongodb";
import * as functions from "../../utils/functions";
import { User } from "../../db/interfaces";
import { UserType } from "../../db/interfaces";

describe("JWT functions", () => {
  it("returns a new access token from a User object", () => {
    const expected = {
      email: "someemail@email.com",
      firstName: "Eunchae",
      lastName: "Hong",
      username: "hhh.e_c.v",
      userType: UserType.Player,
    };

    const input: User = {
      ...expected,
      _id: new ObjectId("64194988c71c8267ab8c8777"),
      createdAt: new Date("2023-03-11T06:35:46.000Z"),
      accessToken: "sometoken",
      refreshToken: "someothertoken",
      hasQR: false,
    };

    const output = functions.genAccessToken(input);
    expect(typeof output).toBe("string");
    expect(output.startsWith("eyJhbG")).toBe(true);
  });

  it("returns the decoded JWT token", () => {
    const output = functions.verifyAccessToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVlbWFpbEBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJFdW5jaGFlIiwibGFzdE5hbWUiOiJIb25nIiwidXNlcm5hbWUiOiJoaGguZV9jLnYiLCJ1c2VyVHlwZSI6InBsYXllciIsImlhdCI6MTY3OTM5MzM2OCwiZXhwIjoxNjgxOTg1MzY4fQ.jdLHv-gTp-aSlsX4oUQrCJF07SkNmcVHy2Q-DMn_jkI"
    );

    expect(output).toMatchObject({
      email: "someemail@email.com",
      firstName: "Eunchae",
      lastName: "Hong",
      username: "hhh.e_c.v",
      userType: "player",
      iat: 1679393368,
      exp: 1681985368,
    });
  });
});
