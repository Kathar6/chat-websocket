import { describe, test, expect } from "vitest";
import express from "express";
import request from "supertest";
import cors from "cors";

// Router
import authRouter from "./auth";

// Middlewares
import responseMiddleware from "../middleware/response";

const app = express();

const corsConfig = {
  origin: process.env.FRONT_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json()); // JSON formatter
app.use(responseMiddleware); // Response middleware

app.use("/api/", authRouter);

describe("Should login and register", () => {
  //#region login
  test("Should login a user", async () => {
    const payload = {
      email: "matepabon@gmail.com",
      password: "test1234",
    };

    const response = await request(app)
      .post("/api/login")
      .set("Content-Type", "application/json")
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.status).toBe("success");
  });
  //#endregion

  //#region register
  test("Should register a user", async () => {
    const payload = {
      email: "matepabon@gmail.com",
      password: "test1234",
      "confirm-password": "test1234",
    };
    const response = await request(app)
      .post("/api/register")
      .set("Content-Type", "application/json")
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });
  //#endregion
});
