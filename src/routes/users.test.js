import { test, expect } from "vitest";
import express from "express";
import request from "supertest";
import cors from "cors";

// Router
import usersRouter from "./users";

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

app.use("/api/user", usersRouter);
test("Should retrieve the user information", async () => {
  const response = await request(app)
    .get("/api/user")
    .set("Content-Type", "application/json")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhODZlOGJmMy00M2MwLTQxMjItOWYxOC1hNGNiM2QwNTAxMjkiLCJpYXQiOjE2OTQxMjU5MjUsImV4cCI6MTY5NDEyOTUyNX0.CUqEaY5VAilEAHZEkgWdA_FLq3XmmEzktzoHvqFbpn0"
    )
    .send();

  expect(response.status).toBe(200);
});
