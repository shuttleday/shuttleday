import { Response } from "express";

export class ApiError extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string, ...params: any) {
    super(...params);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function apiErrorHandler(error: ApiError, res: Response) {
  res.status(error.statusCode).json({ error: error.message });
}

export function throwInternalServerError(res: Response) {
  res.status(500).json({ error: "Internal server error" });
}
