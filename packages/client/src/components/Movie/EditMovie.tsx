import React, { useState } from "react";

import { Button } from "../Button/Button";
import { useUpdateMovieMutation } from "../../hooks/data";

import { IMovie } from "../../types";

import styles from "./Movie.module.css";

export const EditMovie: React.FC<IMovie> = (data) => {
  const [state, setState] = useState<Partial<IMovie>>(data);
  const mutation = useUpdateMovieMutation(data.episode_id);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const buttonText = mutation.isLoading
    ? "Saving..."
    : mutation.isError
    ? `Error: ${(mutation?.error as Error)?.message}`
    : mutation.isSuccess
    ? "Saved"
    : "Save";

  return (
    <article className={styles.root}>
      <h1 className={styles.header} data-testid={"movie-title"}>
        Edit episode
      </h1>
      <dl>
        {
          //TODO: change structure to inputs and lables
        }
        <dt className={styles.definition_term}>title</dt>
        <dd className={styles.definition}>
          <input
            disabled={mutation.isLoading}
            data-testid="movie-title-input"
            required
            name="title"
            onChange={handleInputChange}
            className={styles.definition_input}
            type="text"
            value={state.title}
          />
        </dd>

        <dt className={styles.definition_term}>episode #</dt>
        <dd className={styles.definition}>
          <input
            required
            disabled={mutation.isLoading}
            name="episode_id"
            onChange={handleInputChange}
            className={styles.definition_input}
            type="number"
            value={state.episode_id}
          />
        </dd>

        <dt className={styles.definition_term}>opening</dt>
        <dd className={styles.definition}>
          <textarea
            required
            disabled={mutation.isLoading}
            name="opening_crawl"
            onChange={handleInputChange}
            className={styles.definition_input}
            defaultValue={state.opening_crawl}
          />
        </dd>

        <dt className={styles.definition_term}>director</dt>
        <dd className={styles.definition}>
          <input
            required
            disabled={mutation.isLoading}
            name="director"
            onChange={handleInputChange}
            className={styles.definition_input}
            type="text"
            value={state.director}
          />
        </dd>

        <dt className={styles.definition_term}>producer</dt>
        <dd className={styles.definition}>
          <input
            required
            disabled={mutation.isLoading}
            name="director"
            onChange={handleInputChange}
            className={styles.definition_input}
            type="text"
            value={state.producer}
          />
        </dd>
      </dl>
      <div className={styles.actions}>
        <Button
          disabled={mutation.isLoading}
          type="primary"
          testId="save-button"
          onClick={() => {
            mutation.mutate({ ...data, ...state });
          }}
        >
          {buttonText}
        </Button>
      </div>
    </article>
  );
};
