import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import MoviesList from "../components/MovieList/MoviesList";
import { MovieRout } from "./MovieRout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MoviesList />,
      },
      {
        path: "/movies",
        element: <MoviesList />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieRout />,
      },
      {
        path: "/movies/:movieId/edit",
        element: <MovieRout edit={true} />,
      },
    ],
  },
]);
