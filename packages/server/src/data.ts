import fs from "fs/promises";
import path from "path";

const FILE_NAME = path.join(__dirname, "../data.json");

interface IMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface JSONData {
  count: number;
  next?: number;
  previous?: number;
  results: IMovie[];
}

export const getMovies = async (): Promise<JSONData> => {
  const file = await fs.readFile(FILE_NAME, { encoding: "utf8" });

  const data = JSON.parse(file);

  return data;
};

export const getMovie = async (id: number): Promise<IMovie | undefined> => {
  const data = await getMovies();
  const movie = data.results.find((movie) => movie.episode_id === id);

  return movie;
};
