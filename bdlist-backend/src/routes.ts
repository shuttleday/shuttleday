import { Express, Request, Response } from "express";
import { addPrefix } from "./utils/apiRoute";
import { Users } from "./db/collections";

export default function (app: Express) {
  // healthcheck for API service
  app.get(addPrefix("healthcheck"), (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // Create new user
  app.post(addPrefix("user"), async (req: Request, res: Response) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const document = {
      email,
      firstName,
      lastName,
    };

    const result = await Users.insertOne(document);

    res.status(200).json({ acknowledged: result.acknowledged, document });
  });
}
