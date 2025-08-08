import "dotenv/config";
import express from "express";
import { errorMiddleware } from "@/middleware/error";
import { ErrorResponse } from "@/module/utils";
import { logger, log } from "@/middleware/logger";
import { router } from "./router";

const port = process.env.PORT;

const app = express()
  .use(logger)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api/v1", router)
  .use((_req, res, next) => {
    const err = new ErrorResponse(404, "Not Found");
    err.statusCode = 404;
    next(err);
  })
  .use(errorMiddleware);

export const startServer = () => {
  try {
    app.listen(port, () => {
      log.info(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
