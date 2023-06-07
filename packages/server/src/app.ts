import express, { type Express, type Request, type Response } from "express";
import fs from "fs/promises";
import path from "path";

const FILE_NAME = path.join(__dirname, "../data.json");

const app: Express = express();

app.use((_req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).send("pong");
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/movies", async (_req: Request, res: Response) => {
  try {
    const file = await fs.readFile(FILE_NAME, { encoding: "utf8" });

    const data = JSON.parse(file);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

export { app };
