import styles from "./TaskCard.module.scss";

interface Props {
  title: string;
  date: string;
  time: string;
}

const TaskCard = ({ title, date, time }: Props) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <div>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default TaskCard;
