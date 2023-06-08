import React from 'react';


import { useMovie } from '../../hooks/data';
import styles from './Movie.module.css';

export const Movie: React.FC<{id: number}> = ({id}) => {
    const {data, isLoading, isError} = useMovie(id);
    

    if(isLoading) return (<div>Loading...</div>)
    if(isError) return (<div>Somethig went wrong...</div>)

    const {title} = data!;

    return (
        <div className={styles.root}>
            <h1 className={styles.header} data-testid={'movie-title'}>Episode {id}: {title}</h1>
        </div>
    );
}
