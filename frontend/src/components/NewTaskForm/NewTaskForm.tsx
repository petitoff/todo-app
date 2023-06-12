import { useState } from "react";
import GradientInput from "../common/GradientInput/GradientInput";
import styles from "./NewTaskForm.module.scss";
import useCreateTask from "../../hooks/tasksHooks/useTask";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Task } from "../../types/Task";
import { API_URL } from "../../config";
import { toggleSidebar } from "../../store/slices/sidebarSlice";
import { Close } from "@mui/icons-material";
import { clearActiveTask } from "../../store/slices/taskSlice";

const NewTaskForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [taskData, setTaskData] = useState<Partial<Task>>({
    title: "",
    description: "",
    deadline: "",
  });

  const { createTask } = useCreateTask(API_URL);

  const dispatch = useAppDispatch();

  const handleCreateTask = () => {
    if (!user) return;

    if (
      !taskData ||
      !taskData.title ||
      !taskData.description ||
      !taskData.deadline
    )
      return;

    createTask(user?.email, taskData);

    dispatch(toggleSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(clearActiveTask());
    dispatch(toggleSidebar());
  };

  return (
    <div className={styles.newTaskFormContainer}>
      <div>
        <div className={styles["header-container"]}>
          <h1>NEW TASK</h1>
          <Close className={styles.icon} onClick={handleCloseSidebar} />
        </div>

        <GradientInput
          title="Name"
          placeholder="Enter name of task"
          value={taskData.title}
          setValue={(value) => setTaskData({ ...taskData, title: value })}
        />

        <div className={styles.separator} />

        <h2>Description</h2>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description of task"
          className={styles.descriptionInput}
          value={taskData.description}
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
          value={taskData.deadline}
          onChange={(e) =>
            setTaskData({ ...taskData, deadline: e.target.value })
          }
        />

        <div className={styles.separator} />
        <button className={styles.gradientButton} onClick={handleCreateTask}>
          Create task
        </button>
      </div>
    </div>
  );
};

export default NewTaskForm;
