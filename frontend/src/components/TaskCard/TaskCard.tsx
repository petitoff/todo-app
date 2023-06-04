import { API_URL } from "../../config";
import { useAppDispatch } from "../../hooks/hooks";
import useTask from "../../hooks/tasksHooks/useTask";
import {
  clearActiveTask,
  getTaskByIdAndSetItToActiveTask,
} from "../../store/slices/taskSlice";
import { Task } from "../../types/Task";
import styles from "./TaskCard.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  // const activeTask = useAppSelector((state) => state.task.activeTask);
  const dispatch = useAppDispatch();

  const { updateTask } = useTask(API_URL);

  const handleSetActiveTask = () => {
    dispatch(getTaskByIdAndSetItToActiveTask(task.id));
  };

  const formatDate = (isoDateString?: string) => {
    if (!isoDateString) return;

    const date = new Date(isoDateString);
    return date.toLocaleDateString();
  };

  const formatTime = (isoDateString?: string) => {
    if (!isoDateString) return;

    const date = new Date(isoDateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleCompleteTask = () => {
    if (task) {
      const completedTask: Task = { ...task, completed: true };
      updateTask(completedTask);
      dispatch(clearActiveTask());
    }
  };

  return (
    <div className={styles.container}>
      <CheckCircleIcon
        className={styles["complete-task-icon"]}
        onClick={handleCompleteTask}
        style={{ color: task?.completed ? "green" : "black" }}
      />
      <div onClick={handleSetActiveTask} className={styles["clickable-area"]}>
        <h2>{task.title}</h2>
        <div>
          <p>{formatDate(task.deadline)}</p>
          <p>{formatTime(task.deadline)}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
