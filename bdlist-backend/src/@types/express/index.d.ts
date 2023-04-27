import { Request } from "express";
import { User } from "../../db/interfaces.js";
import { FileExtension } from "file-type";
import fileUpload from "express-fileupload";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
      fileExt?: FileExtension;
      file?: fileUpload;
    }
  }
}
