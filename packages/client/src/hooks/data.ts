import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import type { IMovie } from "../types";

type IDataHook<T> = {
    data?: T;
    isLoading: boolean;
    isError: boolean;
}

export const useMovies = (id?: number):IDataHook<IMovie[]> => {
  const query = useQuery({ queryKey: ["movies"], queryFn: getMovies });
  const { data, isLoading, isError } = query;

  return { data, isLoading, isError };
};
