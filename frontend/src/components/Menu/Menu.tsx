import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <nav className={styles.menuContainer}>
      <ul>
        <li>
          <Link to="/" className={styles.customLink}>
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
