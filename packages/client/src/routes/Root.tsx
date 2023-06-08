import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";

import styles from "./Root.module.css";

export const Root: React.FC = () => {
  return (
    <>
      <NavLink
        data-testid="site-logo"
        to={`/`}
        className={({ isActive }) =>
          `${styles.header} ${
            isActive ? styles.header_disabled : styles.header_link
          }`
        }
      >
        <header>STAR WARS MOVIES</header>
      </NavLink>
      <main className={styles.main}>
        <BreadCrumbs />
        <Outlet />
      </main>
    </>
  );
};
