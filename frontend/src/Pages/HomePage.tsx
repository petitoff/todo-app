import styles from "./HomePage.module.scss";
import Header from "../components/Header/Header";
import TaskList from "../components/TaskList/TaskList";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import Modal from "../components/common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import CustomDrawer from "../components/common/CustomDrawer/CustomDrawer";
import { PanelName, toggleSidebar } from "../store/slices/sidebarSlice";
import Menu from "../components/Menu/Menu";
import NewTaskForm from "../components/NewTaskForm/NewTaskForm";

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
        {panelName === "MENU" ? <Menu /> : <NewTaskForm />}
      </CustomDrawer>

      <Modal isOpen={!!activeTask}>
        <h2>{activeTask?.title}</h2>
      </Modal>
    </>
  );
};

export default HomePage;
