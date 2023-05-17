import { useAppDispatch } from "../../hooks/hooks";
import { setActiveTask } from "../../store/slices/taskSlice";
import { Task } from "../../types/Task";
import styles from "./TaskCard.module.scss";

interface Props {
  title: string;
  date: string;
  time: string;
}

const TaskCard = ({ title, date, time }: Props) => {
  const dispatch = useAppDispatch();

  const handleSetActiveTask = () => {
    dispatch(setActiveTask({ title } as Task));
  };

  return (
    <div className={styles.container} onClick={handleSetActiveTask}>
      <p>{title}</p>
      <div>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default TaskCard;
