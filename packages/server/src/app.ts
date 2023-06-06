import express, { Express, Request, Response } from 'express';
const fs = require('fs/promises');
const path = require('path');
const FILE_NAME = path.join(__dirname,'../data.json');


const app: Express = express();

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong');
});

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong');
});

app.get('/movies', async(req: Request, res: Response) => {
  try {
    const file = await fs.readFile(FILE_NAME,{ encoding: 'utf8' });
    const data = JSON.parse(file);
    res.status(200).json(data);
  } catch (e){
    res.status(500).send(e);
  }
});

export {app};


