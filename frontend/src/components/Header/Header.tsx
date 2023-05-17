import styles from "./Header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>TODO</h1>

      <button className={styles.button}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default Header;
