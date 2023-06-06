import request from "supertest";

import {app} from "../src/app";

describe("Test app.ts", () => {
  test("/ping  route", async () => {
    const res = await request(app).get("/ping");
    expect(res.text).toBe('pong');
  });
});
