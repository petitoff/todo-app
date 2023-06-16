import { useEffect, useState } from "react";
import GradientInput from "../common/GradientInput/GradientInput";
import styles from "./TaskForm.module.scss";
import useTask from "../../hooks/tasksHooks/useTask";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Task } from "../../types/Task";
import { API_URL } from "../../config";
import { toggleSidebar } from "../../store/slices/sidebarSlice";
import { Close } from "@mui/icons-material";
import { clearActiveTask, updateTask } from "../../store/slices/taskSlice";
import SubTaskInForm from "../SubTaskInForm/SubTaskInForm";

interface Props {
  activeTask?: Task;
  isEditMode?: boolean;
}

const TaskForm = ({ activeTask, isEditMode = false }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [taskData, setTaskData] = useState<Partial<Task>>({
    ...(isEditMode && activeTask
      ? {
          title: activeTask.title,
          description: activeTask.description,
          deadline: activeTask.deadline,
        }
      : { title: "", description: "", deadline: "" }),
  });

  const {
    createTask,
    deleteTask,
    updateTask: updateTaskHook,
    createSubTask,
    updateSubTask,
    deleteSubTask,
  } = useTask(API_URL);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!user) return;

    if (
      !taskData ||
      !taskData.title ||
      !taskData.description ||
      !taskData.deadline
    )
      return;

    if (isEditMode && activeTask) {
      updateTaskHook({ ...activeTask, ...taskData });
    } else {
      createTask(user.email, taskData);
    }

    dispatch(clearActiveTask());
    dispatch(toggleSidebar());
  };

  const handleDeleteTask = () => {
    if (activeTask) {
      deleteTask(activeTask.id);
    }
    dispatch(clearActiveTask());
    dispatch(toggleSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(clearActiveTask());
    dispatch(toggleSidebar());
  };

  const handleAddSubTask = (subtask: Task) => {
    if (activeTask) {
      createSubTask(activeTask.id, subtask);
    }
  };

  const handleUpdateSubTask = (subtask: Task) => {
    if (activeTask) {
      updateSubTask(activeTask.id, subtask);
    }
  };

  const handleDeleteSubTask = (id: number) => {
    if (activeTask) {
      deleteSubTask(activeTask.id, id);
    }
  };

  useEffect(() => {
    if (activeTask) {
      dispatch(updateTask(activeTask));
    }
  }, [activeTask, dispatch]);

  return (
    <div className={styles.taskFormContainer}>
      <div>
        <div className={styles["header-container"]}>
          <h1>{isEditMode ? "EDIT TASK" : "NEW TASK"}</h1>
          <Close className={styles.icon} onClick={handleCloseSidebar} />
        </div>

        <GradientInput
          title="Name"
          placeholder="Enter name of task"
          value={taskData.title || ""}
          setValue={(value) => setTaskData({ ...taskData, title: value })}
        />

        <div className={styles.separator} />

        {isEditMode && activeTask && (
          <>
            {activeTask.subTasks?.map((subTask) => (
              <SubTaskInForm
                key={subTask.id}
                id={subTask.id}
                title={subTask.title}
                handleDeleteSubTask={handleDeleteSubTask}
                handleSubTaskChange={handleUpdateSubTask}
              />
            ))}

            <SubTaskInForm
              handleDeleteSubTask={handleDeleteSubTask}
              handleSubTaskChange={handleAddSubTask}
            />
          </>
        )}

        <div className={styles.separator} />

        <h2>Description</h2>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description of task"
          className={styles.descriptionInput}
          value={taskData.description || ""}
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
          value={taskData.deadline || ""}
          onChange={(e) =>
            setTaskData({ ...taskData, deadline: e.target.value })
          }
        />

        <div className={styles.separator} />

        <button
          className={`${styles.button} ${styles["gradient-button"]}`}
          onClick={handleSubmit}
        >
          {isEditMode ? "Update task" : "Create task"}
        </button>

        {isEditMode && (
          <button
            className={`${styles.button} ${styles["gradient-delete-button"]}`}
            onClick={handleDeleteTask}
          >
            Delete task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
