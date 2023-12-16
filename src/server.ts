import express, { Express } from "express";
import { serve, setup } from "swagger-ui-express";

import "./database";
import "./shared/container";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app: Express = express();

app.use(express.json());
app.use("/api-docs", serve, setup(swaggerFile));
app.use(router);

app.listen(3333, () => console.log("Server is running on port 3333"));
