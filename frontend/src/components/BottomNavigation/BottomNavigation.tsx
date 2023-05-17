import { useAppDispatch } from "../../hooks/hooks";
import { setPanelName, toggleSidebar } from "../../store/slices/sidebarSlice";
import styles from "./BottomNavigation.module.scss";

const BottomNavigation = () => {
  const dispatch = useAppDispatch();
  const handleOpenSidebar = () => {
    dispatch(setPanelName("NEW_TASK"));
    dispatch(toggleSidebar());
  };

  return (
    <div className={styles.container}>
      <button className={styles.roundedButton} onClick={handleOpenSidebar}>
        +
      </button>
    </div>
  );
};

export default BottomNavigation;
