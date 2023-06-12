import styles from "./TaskList.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import { API_URL } from "../../config";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import useTask from "../../hooks/tasksHooks/useTask";
import { setTasks } from "../../store/slices/taskSlice";

const TaskList = () => {
  const auth = useAppSelector((state) => state.auth);
  const tasks = useAppSelector((state) => state.task.tasks);

  const { filteredTasks } = useTask(API_URL);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!filteredTasks.data) return;

    dispatch(setTasks(filteredTasks.data));
  }, [filteredTasks, dispatch]);

  if (!auth.isAuth) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div className={styles.container}>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
