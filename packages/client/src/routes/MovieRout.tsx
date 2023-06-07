import React from 'react';
import { useParams } from "react-router-dom";

import { Movie } from '../components/Movie';

export const MovieRout: React.FC = () => {
    const params = useParams();
    const id = params.movieId;
    console.log(params, id);
    
    return (
        <Movie id={parseInt(id!)} />
    );
}