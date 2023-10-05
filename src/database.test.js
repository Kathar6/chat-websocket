import { test, expect } from "vitest";
import { connection } from "mongoose";

test("Should connect or connecting successfully to database", () => {
  const connectionState = connection.readyState;

  expect(connectionState).within(1, 2);
});
