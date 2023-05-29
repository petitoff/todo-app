import { useMutation } from "react-query";
import { Task } from "../../types/Task";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../../store/slices/taskSlice";

const useTask = (API_URL: string) => {
  const BASE_URL = `${API_URL}/tasks`;

  const dispatch = useDispatch();

  const createTaskMutation = useMutation(
    async ({
      userEmail,
      taskData,
    }: {
      userEmail: string;
      taskData: Partial<Task>;
    }) => {
      const response = await axios.post(
        `${BASE_URL}?userEmail=${encodeURIComponent(userEmail)}`,
        taskData
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Update tasks in the Redux store
        dispatch(updateTask(data));
      },
    }
  );

  const deleteTaskMutation = useMutation(
    async (taskId: number) => {
      await axios.delete(`${BASE_URL}/${taskId}`);
      return taskId;
    },
    {
      onSuccess: (taskId) => {
        // Remove task from Redux store
        dispatch(removeTask(taskId));
      },
    }
  );

  const createTask = async (userEmail: string, taskData: Partial<Task>) => {
    try {
      await createTaskMutation.mutateAsync({ userEmail, taskData });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return {
    createTask,
    deleteTask,
    isLoading: createTaskMutation.isLoading || deleteTaskMutation.isLoading,
    error: createTaskMutation.error || deleteTaskMutation.error,
  };
};

export default useTask;
