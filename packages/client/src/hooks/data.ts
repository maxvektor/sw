import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMovies, getMovie, updateMovie } from "../api";
import type { IMovie } from "../types";

type IDataReturnType<T> = {
  data?: T;
  isLoading: boolean;
  isError: boolean;
};

type IDataCollection<T> = () => IDataReturnType<T[]>;
type IDataItem<T> = (id: number) => IDataReturnType<T>;

export const useMovies: IDataCollection<IMovie> = () => {
  const query = useQuery({ queryKey: ["movies"], queryFn: getMovies });
  const { data, isLoading, isError } = query;

  return { data, isLoading, isError };
};

export const useMovie: IDataItem<IMovie> = (id: number) => {
  const queryClient = useQueryClient();

  const queryFn = async (id: number) => {
    const movies = queryClient.getQueryData<IMovie[]>(["movies"]);
    // one more check for the case when we have a movie in the cache
    if (movies) {
      const movie = movies.find((movie) => movie.episode_id === id);
      if (movie) return movie;
    }

    return getMovie(id);
  };

  const query = useQuery({
    queryKey: ["movies", id.toString()],
    queryFn: () => queryFn(id),
  });
  const { data, isLoading, isError } = query;

  return { data, isLoading, isError };
};

export const useUpdateMovieMutation = (id: number) => {
  const queryClient = useQueryClient();
  type IMovieUpdate = Pick<
    IMovie,
    "episode_id" | "director" | "producer" | "opening_crawl"
  >;
  let newMovieData: IMovieUpdate;

  const mutation = useMutation({
    mutationFn: (data: IMovieUpdate) => {
      newMovieData = data;
      return updateMovie(id, data);
    },
    onSuccess: () => {
      newMovieData = newMovieData as IMovieUpdate;
      queryClient.invalidateQueries([
        "movies",
        newMovieData.episode_id.toString(),
      ]);
      queryClient.setQueryData(["movies"], (old: IMovie[] | undefined) =>
        !old
          ? undefined
          : old.map((movie) => {
              if (movie.episode_id === newMovieData.episode_id) {
                return { ...newMovieData, ...movie };
              }
              return movie;
            })
      );
    },
  });

  return mutation;
};
