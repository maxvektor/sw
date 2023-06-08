import { IMovie } from "../types";
import { getServerBaseUrl } from "./baseURL";

const BASE_URL = getServerBaseUrl();

export const getMovies = async (): Promise<IMovie[]> =>
  fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.results);

export const getMovie = async (id:number): Promise<IMovie> =>
  fetch(`${BASE_URL}/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json());
