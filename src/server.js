import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import DatabaseConnection from "./database/connection.js";
import swaggerSetup from "./swagger.js";

import { bootstrap as bootstrapWs } from "./websockets/server.js";

// Routes
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

// Middlewares
import responseMiddleware from "./middleware/response.js";

const app = express();
const router = express.Router();

const corsConfig = {
  origin: process.env.FRONT_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json()); // JSON formatter
app.use(express.text()); // Plain text formatter
app.use(responseMiddleware); // Response middleware

// Disable x-powered-by by security issues
app.disable("x-powered-by");

// Global route prefix
app.use("/api", router);

// custom routes
router.use("/", authRouter);
router.use("/user", userRouter);

export const bootstrap = async (port) => {
  const dbConnection = new DatabaseConnection();
  dbConnection.connect();

  const server = app.listen(port, () => {
    console.log(`Listening on port \x1b[96m ${port} `);
    swaggerSetup(app, process.env.SWAGGER_PORT);
  });

  // bootstraps Websocket server
  const wsServer = bootstrapWs(server);

  wsServer.on("connection", (stream) => {
    console.log("connected");
  });
};
