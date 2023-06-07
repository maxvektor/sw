import express, { type Express, type Request, type Response } from "express";
import { getMovies, getMovie } from "./data";

const app: Express = express();

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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/movies", async (_req: Request, res: Response) => {
  try {
    const data = await getMovies();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/movies/:id", async (_req: Request, res: Response) => {
  const movieId = parseInt(_req.params.id, 10);

  try {
    const movie = await getMovie(movieId);
    if (movie !== undefined) {
      res.status(200).json(movie);

      return;
    }

    res.status(404).send("Movie not found");
  } catch (e) {
    res.status(500).send(e);
  }
});

export { app };
