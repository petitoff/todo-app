import styles from "./TaskList.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import { API_URL } from "../../config";
import { useAppSelector } from "../../hooks/hooks";
import useFetchUserTasks from "../../hooks/tasksHooks/useFetchUserTasks";
import { useEffect, useState } from "react";

const TaskList = () => {
  const auth = useAppSelector((state) => state.auth);
  const tasks = useAppSelector((state) => state.task.tasks);
  const filterCondition = useAppSelector((state) => state.task.filterCondition);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useFetchUserTasks(auth.token, API_URL);

  useEffect(() => {
    if (!tasks) return;

    if (filterCondition === "COMPLETED") {
      setFilteredTasks(tasks.filter((task) => task.completed));
      return;
    }

    setFilteredTasks(tasks);
  }, [filterCondition, tasks]);

  if (!auth.isAuth) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div className={styles.container}>
      {filteredTasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
