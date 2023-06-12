import styles from "./HomePage.module.scss";
import Header from "../../components/Header/Header";
import TaskList from "../../components/TaskList/TaskList";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import CustomDrawer from "../../components/common/CustomDrawer/CustomDrawer";
import { PanelName, toggleSidebar } from "../../store/slices/sidebarSlice";
import Menu from "../../components/Menu/Menu";
import NewTaskForm from "../../components/NewTaskForm/NewTaskForm";
import EditTaskForm from "../../components/EditTaskForm/EditTaskForm";

const HomePage = () => {
  const activeTask = useAppSelector((state) => state.task.activeTask);
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const panelName: PanelName | undefined = useAppSelector(
    (state) => state.sidebar.panelName
  );

  const dispatch = useAppDispatch();

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  console.log(activeTask, panelName);

  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.homePageView}>
          <Header />
          <TaskList />
          <BottomNavigation />
        </div>
      </div>

      <CustomDrawer isOpen={isSidebarOpen} onClose={handleCloseSidebar}>
        {panelName === "MENU" ? (
          <Menu />
        ) : panelName === "NEW_TASK" || panelName !== "EDIT_TASK" ? (
          <NewTaskForm />
        ) : (
          <EditTaskForm activeTask={activeTask} />
        )}
      </CustomDrawer>
    </>
  );
};

export default HomePage;
