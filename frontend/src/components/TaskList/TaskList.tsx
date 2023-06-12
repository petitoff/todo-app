import styles from "./TaskList.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import { API_URL } from "../../config";
import { useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import useTask from "../../hooks/tasksHooks/useTask";

const TaskList = () => {
  const auth = useAppSelector((state) => state.auth);
  const tasks = useAppSelector((state) => state.task.tasks);

  const { filteredTasks } = useTask(API_URL);

  useEffect(() => {});

  if (!auth.isAuth) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div className={styles.container}>
      {filteredTasks.data?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
