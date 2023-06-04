import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setPanelName, toggleSidebar } from "../../store/slices/sidebarSlice";
import { setFilterCondition } from "../../store/slices/taskSlice";
import styles from "./BottomNavigation.module.scss";
import DoneIcon from "@mui/icons-material/Done";

const BottomNavigation = () => {
  const filterCondition = useAppSelector((state) => state.task.filterCondition);

  const dispatch = useAppDispatch();

  const handleOpenSidebar = () => {
    dispatch(setPanelName("NEW_TASK"));
    dispatch(toggleSidebar());
  };

  const handleSetFilterCondition = () => {
    if (filterCondition === "COMPLETED") {
      dispatch(setFilterCondition(undefined));
      return;
    }

    dispatch(setFilterCondition("COMPLETED"));
  };

  return (
    <div className={styles.container}>
      <button className={styles.roundedButton} onClick={handleOpenSidebar}>
        +
      </button>
      <button
        className={styles.roundedButton}
        onClick={handleSetFilterCondition}
      >
        <DoneIcon />
      </button>
    </div>
  );
};

export default BottomNavigation;
