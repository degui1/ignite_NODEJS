import "reflect-metadata";
import express, { Express, NextFunction, Request, Response } from "express";
import { serve, setup } from "swagger-ui-express";
import "express-async-errors";

import "@shared/infra/typeorm";
import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app: Express = express();

app.use(express.json());
app.use("/api-docs", serve, setup(swaggerFile));
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (err: Error, req: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log("Server is running on port 3333"));
