import { Request } from "express";
import { User } from "../../db/interfaces";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: WithId<User>;
    }
  }
}
