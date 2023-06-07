import React from 'react';
import { useMovie } from '../hooks/data';

export const Movie: React.FC<{id: number}> = ({id}) => {
    const {data, isLoading, isError} = useMovie(id);

    return (
        <div>
            <div>Movie {id}</div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {data && <div>{data.title}</div>}
        </div>
    );
}
