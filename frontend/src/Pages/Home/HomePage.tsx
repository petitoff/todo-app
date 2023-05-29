import styles from "./HomePage.module.scss";
import Header from "../../components/Header/Header";
import TaskList from "../../components/TaskList/TaskList";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import Modal from "../../components/common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import CustomDrawer from "../../components/common/CustomDrawer/CustomDrawer";
import { PanelName, toggleSidebar } from "../../store/slices/sidebarSlice";
import Menu from "../../components/Menu/Menu";
import NewTaskForm from "../../components/NewTaskForm/NewTaskForm";
import useTask from "../../hooks/tasksHooks/useTask";
import { API_URL } from "../../config";
import { clearActiveTask } from "../../store/slices/taskSlice";

const HomePage = () => {
  const activeTask = useAppSelector((state) => state.task.activeTask);
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const panelName: PanelName | undefined = useAppSelector(
    (state) => state.sidebar.panelName
  );

  const dispatch = useAppDispatch();

  const { deleteTask } = useTask(API_URL);

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleDeleteTask = () => {
    deleteTask(activeTask?.id!);

    dispatch(clearActiveTask());
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
        <p>{activeTask?.description}</p>
        <button onClick={handleDeleteTask}>Delete task</button>
      </Modal>
    </>
  );
};

export default HomePage;
