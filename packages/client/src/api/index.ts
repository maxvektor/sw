import { IMovie } from "../types";

export const getMovies = async (): Promise<IMovie[]> =>
  fetch("http://localhost:3001/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.results);

export const getMovie = async (id:number): Promise<IMovie> =>
  fetch(`http://localhost:3001/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json());
