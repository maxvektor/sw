import request from "supertest";

import {app} from "../app";

describe("Test app.ts", () => {
  test("/ping  route", async () => {
    const res = await request(app).get("/ping");
    expect(res.text).toBe('pong');
  });

  test("/movies route", async () => {
    const res = await request(app).get("/movies");
    const data = JSON.parse(res.text);
    const result = data.results;
    expect(res.statusCode).toEqual(200);
    expect(result[0].title).toBe('A New Hope');
  });  
});
