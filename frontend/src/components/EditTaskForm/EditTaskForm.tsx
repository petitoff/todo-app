import { useState } from "react";
import { API_URL } from "../../config";
import { useAppDispatch } from "../../hooks/hooks";
import { Task } from "../../types/Task";
import styles from "./EditTaskForm.module.scss";
import GradientInput from "../common/GradientInput/GradientInput";
import useTask from "../../hooks/tasksHooks/useTask";
import { clearActiveTask } from "../../store/slices/taskSlice";
import { toggleSidebar } from "../../store/slices/sidebarSlice";

interface Props {
  activeTask?: Task;
}

const EditTaskForm = ({ activeTask }: Props) => {
  const [taskData, setTaskData] =
    useState<Partial<Task | undefined>>(activeTask);

  const { deleteTask, updateTask } = useTask(API_URL);

  const dispatch = useAppDispatch();

  const handleUpdateTask = () => {
    const task = { ...taskData };

    updateTask(task);

    dispatch(clearActiveTask());
    dispatch(toggleSidebar());
  };

  const handleDeleteTask = () => {
    deleteTask(activeTask?.id!);

    dispatch(clearActiveTask());
    dispatch(toggleSidebar());
  };

  return (
    <div className={styles.newTaskFormContainer}>
      <div>
        <h1>Edit TASK</h1>
        <GradientInput
          title="Name"
          placeholder="Enter name of task"
          value={taskData?.title}
          setValue={(value) => setTaskData({ ...taskData, title: value })}
        />

        <div className={styles.separator} />

        <h2>Description</h2>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description of task"
          className={styles.descriptionInput}
          value={taskData?.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
        />

        <div className={styles.separator} />

        <h2>DEADLINE</h2>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          value={taskData?.deadline}
          onChange={(e) =>
            setTaskData({ ...taskData, deadline: e.target.value })
          }
        />

        <div className={styles.separator} />
        <button
          className={`${styles.button} ${styles["gradient-button"]}`}
          onClick={handleUpdateTask}
        >
          Update task
        </button>

        <button
          className={`${styles.button} ${styles["gradient-delete-button"]}`}
          onClick={handleDeleteTask}
        >
          Delete task
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
