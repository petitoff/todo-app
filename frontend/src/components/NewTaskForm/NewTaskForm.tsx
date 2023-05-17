import GradientInput from "../common/GradientInput/GradientInput";
import styles from "./NewTaskForm.module.scss";

const NewTaskForm = () => {
  return (
    <div className={styles.newTaskFormContainer}>
      <h1>NEW TASK</h1>
      <GradientInput title="Name" placeholder="Enter name of task" />
    </div>
  );
};

export default NewTaskForm;
