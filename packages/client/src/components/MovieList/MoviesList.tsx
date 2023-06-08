import React from "react";
import { Link } from "react-router-dom";

import { useMovies } from "../../hooks/data";
import styles from "./MoviesList.module.css";

const MoviesList: React.FC = () => {
  const { data, isError, isLoading } = useMovies();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Somethig went wrong...</div>;

  return (
    <div data-testid="movies-list">
      <div className={styles.container}>
        {data &&
          data!.map(({ episode_id, title, opening_crawl }) => (
            <div
              className={styles.movie}
              key={episode_id}
              data-testid={`movies-item-${episode_id}`}
            >
              <Link
                to={`/movies/${episode_id}`}
                data-testid="movie-title"
                className={styles.title}
              >
                <h2 className={styles.heading}>{title}</h2>
              </Link>
              <div>{opening_crawl}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
