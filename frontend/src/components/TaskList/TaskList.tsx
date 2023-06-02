import styles from "./TaskList.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import { API_URL } from "../../config";
import { useAppSelector } from "../../hooks/hooks";
import useFetchUserTasks from "../../hooks/tasksHooks/useFetchUserTasks";

const TaskList = () => {
  const auth = useAppSelector((state) => state.auth);
  const tasks = useAppSelector((state) => state.task.tasks);

  useFetchUserTasks(auth.token, API_URL);

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
