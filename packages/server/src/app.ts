/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Request, type Response } from "express";
import { getMovies, getMovie, updateMovie, restoreBackup } from "./data";
import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.json());

app.use((_req, res, next) => {
  // TODO: only for development; Set right CORS headers ASAP
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.get("/movies", async (_req: Request, res: Response) => {
  try {
    const data = await getMovies();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/movies/:id", async (_req: Request, res: Response) => {
  const movieId = parseInt(_req.params.id, 10);
  try {
    const movie = await getMovie(movieId);

    if (movie === undefined) {
      res.status(404).send("Movie not found");
      return;
    }

    res.status(200).send(movie);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put("/movies/:id", async (_req: Request, res: Response) => {
  const movieId = parseInt(_req.params.id, 10);
  const newData = _req.body;

  try {
    const movie = await getMovie(movieId);

    if (movie === undefined) {
      res.status(404).send("Movie not found");
      return;
    }

    await updateMovie(movieId, { ...movie, ...newData });
    res.status(200).send("Movie updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

// only for development/testing
if (process.env.NODE_ENV !== "production") {
  app.post("/__restore", async (_req: Request, res: Response) => {
    try {
      await restoreBackup();
      res.status(200).send("backup restored");
    } catch (e) {
      res.status(500).send(e);
    }
  });
}

export { app };
