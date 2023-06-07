import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const queryFn = async (id: number) =>{
    debugger;
    
    const movies = queryClient.getQueryData<IMovie[]>(["movies"]);
    // one more check for the case when we have a movie in the cache
    if(movies){
      const movie = movies.find((movie) => movie.episode_id === id);
      if(movie) return movie;
    }

    return getMovie(id)
  }

  const query = useQuery({ queryKey: ["movies", id.toString()], queryFn: () => queryFn(id)});
  const { data, isLoading, isError } = query;
  
  return { data, isLoading, isError };
}
