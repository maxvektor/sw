import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

import styles from './Root.module.css';

export const  Root:React.FC = () => {
    return (
        <div>
            <NavLink
                data-testid='site-logo'
                to={`/`}
                className={({ isActive }) => `${styles.header} ${isActive ? styles.header_disabled :  styles.header_link}` }
                >
                <header>STAR WARS MOVIES</header>
            </NavLink>
            <Outlet />
        </div>
    );
}