import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong');
});

export {app};


