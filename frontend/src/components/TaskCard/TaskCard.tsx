import { API_URL } from "../../config";
import { useAppDispatch } from "../../hooks/hooks";
import useTask from "../../hooks/tasksHooks/useTask";
import { setPanelName, toggleSidebar } from "../../store/slices/sidebarSlice";
import {
  clearActiveTask,
  getTaskByIdAndSetItToActiveTask,
  updateTask as updateTaskAction,
} from "../../store/slices/taskSlice";
import { Task } from "../../types/Task";
import styles from "./TaskCard.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useAppDispatch();

  const { updateTask } = useTask(API_URL);

  const handleSetActiveTask = () => {
    dispatch(getTaskByIdAndSetItToActiveTask(task.id));
    dispatch(setPanelName("EDIT_TASK"));
    dispatch(toggleSidebar());
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

  const handleCompleteTask = async () => {
    if (task) {
      const completedTask: Task = { ...task, completed: !task.completed };
      // Optimistically update the state
      dispatch(updateTaskAction(completedTask));
      try {
        // Make the API call to update the task
        await updateTask(completedTask);
      } catch (error) {
        console.error("Failed to update task:", error);
        // Optionally, you can dispatch another action to revert the state if the API call fails
      }
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
