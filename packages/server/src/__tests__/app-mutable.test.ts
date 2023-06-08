import request from "supertest";

import { app } from "../app";
import { restoreBackup } from "../data";

if (process.env.NODE_ENV !== "production") {
  describe("app.ts routes - mutable test, not for production", () => {
    afterAll(async () => {
      await restoreBackup();
    });

    beforeEach(async () => {
      await restoreBackup();
    });

    test("should update movie", async () => {
      const res = await request(app).put("/movies/4").send({
        title: "An Old Houp",
      });

      expect(res.statusCode).toEqual(200);

      const updatedMovie = await request(app).get("/movies/4");
      const movie = JSON.parse(updatedMovie.text);
      expect(movie.title).toBe("An Old Houp");
    });
  });
}
