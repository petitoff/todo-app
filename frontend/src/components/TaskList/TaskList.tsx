import styles from "./TaskList.module.scss";
import TaskCard from "../TaskCard/TaskCard";
import useFetchTasks from "../../hooks/useFetchTasks";
import { API_URL } from "../../config";
import { useAppSelector } from "../../hooks/hooks";

const TaskList = () => {
  const taskEndpoint = `${API_URL}/tasks`;

  const tasks = useAppSelector((state) => state.task.tasks);
  const { tasks: tasksFetched, isLoading, error } = useFetchTasks(taskEndpoint);

  console.log(tasks);

  return (
    <div className={styles.container}>
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          date="2021-10-01"
          time="10:00"
        />
      ))}
      <TaskCard title="Task 1" date="2021-10-01" time="10:00" />
    </div>
  );
};

export default TaskList;
