import request from "supertest";

import { app } from "../app";
import { restoreBackup } from "../data";

describe("app.ts routes", () => {
  describe("/ping", () => {
    test("should return pong", async () => {
      const res = await request(app).get("/ping");
      expect(res.text).toBe("pong");
    });
  });

  describe("/movies", () => {
    test("should return list of movies", async () => {
      const res = await request(app).get("/movies");
      const data = JSON.parse(res.text);
      const result = data.results;
      expect(res.statusCode).toEqual(200);
      expect(result.length > 0).toBe(true);
      expect(result[0].title).toBe("A New Hope");
    });

    test("/4 should return 'A New Hope'", async () => {
      const res = await request(app).get("/movies/4");
      const movie = JSON.parse(res.text);
      expect(res.statusCode).toEqual(200);
      expect(movie.title).toBe("A New Hope");
    });

    test("/2 should return 'Attack of the Clones'", async () => {
      const res = await request(app).get("/movies/2");
      const movie = JSON.parse(res.text);
      expect(res.statusCode).toEqual(200);
      expect(movie.title).toBe("Attack of the Clones");
    });

    test("/100 should return 404", async () => {
      const res = await request(app).get("/movies/100");
      expect(res.statusCode).toEqual(404);
      expect(res.text).toBe("Movie not found");
    });

    describe("/PUT /movies/:id", () => {
      afterEach(async () => {
        await restoreBackup();
      });

      test("should return 404 if movie not found", async () => {
        const res = await request(app).put("/movies/100").send({
          title: "Old Houp",
        });
        expect(res.statusCode).toEqual(404);
        expect(res.text).toBe("Movie not found");
      });
    });
  });
});
