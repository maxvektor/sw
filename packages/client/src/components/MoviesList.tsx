import React from "react";
import { useMovies } from "../hooks/data";
import styles from "./MoviesList.module.css";
import { Link } from "react-router-dom";

const MoviesList: React.FC = () => {
  const { data } = useMovies();

  return (
    <div>
      <div className={styles.container}>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div className={styles.movie} key={item.episode_id}>
              <Link to={`/movies/${item.episode_id}`} >
                <div className={styles.title}>{item.title}</div>
              </Link>
              <div>{item.opening_crawl}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
