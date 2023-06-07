import React from 'react';
import { Outlet } from "react-router-dom";

import styles from './Root.module.css';

export const  Root:React.FC = () => {
    return (
        <div>
            <header className={styles.header}>STAR WARS MOVIES</header>
            <Outlet />
        </div>
    );
}