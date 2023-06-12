import styles from "./Header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setPanelName, toggleSidebar } from "../../store/slices/sidebarSlice";

const Header = () => {
  const isFiltered = useAppSelector(
    (state) => state.task.filterCondition !== undefined
  );
  const dispatch = useAppDispatch();

  const handleOpenSidebar = () => {
    dispatch(setPanelName("MENU"));
    dispatch(toggleSidebar());
  };

  return (
    <div className={styles.header}>
      <h1>{isFiltered ? "Task completed" : "TODO"}</h1>

      <button className={styles.button} onClick={handleOpenSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default Header;
