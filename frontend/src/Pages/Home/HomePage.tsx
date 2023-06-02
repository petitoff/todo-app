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
import { useEffect, useState } from "react";

const HomePage = () => {
  const activeTask = useAppSelector((state) => state.task.activeTask);
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const panelName: PanelName | undefined = useAppSelector(
    (state) => state.sidebar.panelName
  );

  const [title, setTitle] = useState(activeTask?.title ?? "");
  const [description, setDescription] = useState(activeTask?.description ?? "");

  const dispatch = useAppDispatch();

  const { deleteTask, updateTask } = useTask(API_URL);

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleDeleteTask = () => {
    deleteTask(activeTask?.id!);

    dispatch(clearActiveTask());
  };

  const handleUpdateTask = () => {
    const task = { ...activeTask, title, description };

    updateTask(task);

    dispatch(clearActiveTask());
  };

  useEffect(() => {
    activeTask?.title && setTitle(activeTask?.title);
    activeTask?.description && setDescription(activeTask?.description);
  }, [activeTask]);

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
        <div className={styles["modal-container"]}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea
            className={styles["text-area"]}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleDeleteTask}>Delete task</button>
          <button onClick={handleUpdateTask}>Update task</button>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;
