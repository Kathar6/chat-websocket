import { describe, test, expect } from "vitest";
import { DefaultResponse } from "../utils";

describe("Should pass all test", () => {
  //#region success
  test("Should return a success response", () => {
    const response = new DefaultResponse(200);

    const data = response.getResponse();
    expect(data.response.status).toEqual("success");
  });
  //#endregion
  //#region info
  test("Should return an info response", () => {
    const response = new DefaultResponse(100);

    const data = response.getResponse();
    expect(data.response.status).toEqual("information");
  });
  //#endregion
  //#region redirect
  test("Should return an redirect response", () => {
    const response = new DefaultResponse(300);

    const data = response.getResponse();
    expect(data.response.status).toEqual("redirection");
  });
  //#endregion
  //#region error
  test("Should return an error response", () => {
    const response = new DefaultResponse(400);

    const data = response.getResponse();
    expect(data.response.status).toEqual("error");
  });
  //#endregion
});
