import React from "react";
import { useMovies } from "../hooks/data";
import styles from "./MoviesList.module.css";
import { Link } from "react-router-dom";

const MoviesList: React.FC = () => {
  const { data } = useMovies();

  return (
    <div data-testid='movies-list'>
      <div className={styles.container}>
        {data &&
          data.length > 0 &&
          data.map(({episode_id, title,opening_crawl}) => (
            <div className={styles.movie} key={episode_id} data-testid={`movies-item-${episode_id}`}>
              <Link to={`/movies/${episode_id}`} >
                <div data-testid='movie-title' className={styles.title}>{title}</div>
              </Link>
              <div>{opening_crawl}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
