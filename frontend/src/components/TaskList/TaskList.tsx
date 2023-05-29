import styles from "./TaskList.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import useFetchTasks from "../../hooks/tasksHooks/useFetchTasks";
import { API_URL } from "../../config";
import { useAppSelector } from "../../hooks/hooks";

const TaskList = () => {
  const taskEndpoint = `${API_URL}/tasks`;

  const tasks = useAppSelector((state) => state.task.tasks);
  useFetchTasks(taskEndpoint);

  return (
    <div className={styles.container}>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
