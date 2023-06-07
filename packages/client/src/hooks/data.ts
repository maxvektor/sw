import { useQuery } from "@tanstack/react-query";
import { getMovies, getMovie } from "../api";
import type { IMovie } from "../types";

type IDataReturnType<T> = {
  data?: T;
  isLoading: boolean;
  isError: boolean;
}

type IDataCollection<T> = () => IDataReturnType<T[]>
type IDataItem<T> = (id: number) => IDataReturnType<T>

export const useMovies:IDataCollection<IMovie> = () => {
  const query = useQuery({ queryKey: ["movies"], queryFn: getMovies });
  const { data, isLoading, isError } = query;

  return { data, isLoading, isError };
};

export const useMovie:IDataItem<IMovie> = (id: number) => {
  const query = useQuery({ queryKey: ["movies", id.toString()], queryFn: () => getMovie(id) });
  const { data, isLoading, isError } = query;
  
  return { data, isLoading, isError };
}
