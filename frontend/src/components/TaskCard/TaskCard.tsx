import { useAppDispatch } from "../../hooks/hooks";
import { getTaskByIdAndSetItToActiveTask } from "../../store/slices/taskSlice";
import { Task } from "../../types/Task";
import styles from "./TaskCard.module.scss";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useAppDispatch();

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

  return (
    <div className={styles.container} onClick={handleSetActiveTask}>
      <h2>{task.title}</h2>
      <div>
        <p>{formatDate(task.deadline)}</p>
        <p>{formatTime(task.deadline)}</p>
      </div>
    </div>
  );
};

export default TaskCard;
