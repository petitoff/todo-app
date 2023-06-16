import { useState } from "react";
import { Task } from "../../types/Task";
import styles from "./SubTaskInForm.module.scss";
import { Delete } from "@mui/icons-material";

interface Props {
  id?: number;
  title?: string;
  handleDeleteSubTask: (id: number) => void;
  handleSubTaskChange: (task: Task) => void;
}

const SubTaskInForm = ({
  id,
  title,
  handleDeleteSubTask,
  handleSubTaskChange,
}: Props) => {
  const [subtaskTitle, setSubtaskTitle] = useState(title ?? "");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && subtaskTitle.trim()) {
      const newSubtask: Task = {
        id: id ?? Number(Math.random().toString(36).substr(2, 9)),
        title: subtaskTitle,
        completed: false,
      };
      handleSubTaskChange(newSubtask);
    }
  };

  const handleDelete = () => {
    if (id) {
      handleDeleteSubTask(id);
    }
  };

  return (
    <div className={styles["sub-task"]}>
      {title ? (
        <span className={styles.delete}>
          <Delete onClick={handleDelete} />
        </span>
      ) : (
        <span className={styles.plus}>+</span>
      )}

      <input
        placeholder="Add step"
        value={subtaskTitle}
        onChange={(e) => setSubtaskTitle(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SubTaskInForm;
