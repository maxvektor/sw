import { useLocation, Link } from "react-router-dom";

import styles from "./BreadCrumbs.module.css";

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/").filter((item) => Boolean(item)); //only non-empty strings
  pathName.pop(); // last element is current page, we don't need it

  if (pathName.length === 0) return null;

  return (
    <nav className={styles.root} data-testid={"breadcrumbs"}>
      <ul className={styles.list}>
        {pathName.map((item, index) => (
          <li className={styles.item} key={item}>
            <Link
              to={`/${pathName.slice(0, index + 1).join("/")}`}
              className={styles.item__link}
              data-testid={`breadcrumb-${item}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
