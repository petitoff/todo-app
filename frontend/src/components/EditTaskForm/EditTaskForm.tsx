import { Task } from "../../types/Task";
import TaskForm from "../TaskForm/TaskForm";

interface Props {
  activeTask?: Task;
}

const EditTaskForm = ({ activeTask }: Props) => {
  return (
    <>
      <TaskForm activeTask={activeTask} isEditMode />
    </>
  );
};

export default EditTaskForm;
