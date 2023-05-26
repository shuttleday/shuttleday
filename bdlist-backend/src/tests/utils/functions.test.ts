import { ObjectId } from "mongodb";
import * as functions from "../../utils/functions.js";
import { User } from "../../db/interfaces.js";

describe("JWT functions", () => {
  it("returns a new access token from a User object", () => {
    const expected = {
      email: "someemail@email.com",
      firstName: "Eunchae",
      lastName: "Hong",
      username: "hhh.e_c.v",
    };

    const input: User = {
      ...expected,
      _id: new ObjectId("64194988c71c8267ab8c8777"),
      createdAt: new Date("2023-03-11T06:35:46.000Z"),
      accessToken: "sometoken",
      refreshToken: "someothertoken",
      QR: {
        uploaded: false,
        fileExt: null,
      },
    };

    const output = functions.genAccessToken(input);
    expect(typeof output).toBe("string");
    expect(output.startsWith("eyJhbG")).toBe(true);
  });
});
