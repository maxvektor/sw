import React from "react";
import { EditMovie } from "./EditMovie";

import { useMovie } from "../../hooks/data";
import styles from "./Movie.module.css";

export const Movie: React.FC<{ id: number; edit?: boolean }> = ({
  id,
  edit = false,
}) => {
  const { data, isLoading, isError } = useMovie(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Somethig went wrong...</div>;

  const {
    title,
    opening_crawl,
    director = "unknown",
    producer = "unknown",
    created,
  } = data!;
  const creationDate = new Date(created);
  const year = creationDate.getFullYear();
  const monts = creationDate.getUTCMonth();

  if (edit) {
    return <EditMovie {...data!} />;
  }

  return (
    <article className={styles.root}>
      <h1 className={styles.header} data-testid={"movie-title"}>
        Episode {id}: {title}
      </h1>

      <div className={styles.created}>
        created: <time dateTime={`${year}-${monts}`}>{`${monts}/${year}`}</time>
      </div>
      <div className={styles.description}>
        <p>{opening_crawl}</p>

        <dl>
          <dt className={styles.definition_term}>director</dt>
          <dd className={styles.definition}>{director}</dd>

          <dt className={styles.definition_term}>producer</dt>
          <dd className={styles.definition}>{producer}</dd>
        </dl>
      </div>
    </article>
  );
};
