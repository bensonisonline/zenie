import type { Request, Response, NextFunction } from "express";
import { log } from "./logger";
import { ErrorResponse } from "@/module/utils";

// Error middleware
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorMessage =
    err.message === "Not Found"
      ? "Route not found on this server"
      : err.message;
  log.error(`Error: ${errorMessage}`);

  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      status: "error",
      message: errorMessage,
    });
  }
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
