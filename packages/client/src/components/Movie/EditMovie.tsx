import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMovie } from "../../api";

import { Button } from "../Button/Button";
import { IMovie } from "../../types";
import styles from "./Movie.module.css";

export const EditMovie: React.FC<IMovie> = (data) => {
  const [state, setState] = useState<Partial<IMovie>>(data);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: IMovie) => updateMovie(data.episode_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["movies", data.episode_id.toString()]);
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value, event);
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
          type="primary"
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
