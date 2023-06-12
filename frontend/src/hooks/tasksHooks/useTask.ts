import { useMutation, useQuery } from "react-query";
import { Task } from "../../types/Task";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from "../../store/slices/taskSlice";
import { useAppSelector } from "../hooks";

import { FilterCondition } from "../../store/slices/taskSlice";

const useTask = (API_URL: string) => {
  const BASE_URL = `${API_URL}/tasks`;
  const token = useAppSelector((state) => state.auth.token);

  const filter = useAppSelector((state) => state.task.filterCondition);

  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const createTaskMutation = useMutation(
    async ({
      userEmail,
      taskData,
    }: {
      userEmail: string;
      taskData: Partial<Task>;
    }) => {
      // Use axiosInstance instead of axios
      const response = await axiosInstance.post(
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

  const updateTaskMutation = useMutation(
    async (taskData: Partial<Task>) => {
      // Use axiosInstance instead of axios
      const taskDataLocal: Partial<Task> = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline,
        completed: taskData.completed,
      };

      const response = await axiosInstance.put(
        `${BASE_URL}/${taskData.id}`,
        taskDataLocal
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
      // Use axiosInstance instead of axios
      await axiosInstance.delete(`${BASE_URL}/${taskId}`);
      return taskId;
    },
    {
      onSuccess: (taskId) => {
        // Remove task from Redux store
        dispatch(removeTask(taskId));
      },
    }
  );

  const createTaskExistingTask = async (
    userEmail?: string,
    taskData?: Partial<Task>
  ) => {
    try {
      if (!userEmail || !taskData) {
        throw new Error("Missing user email or task data");
      }

      await createTaskMutation.mutateAsync({ userEmail, taskData });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTaskExistingTask = async (taskData: Partial<Task>) => {
    try {
      await updateTaskMutation.mutateAsync(taskData);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTaskExistingTask = async (taskId: number) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = useQuery<Task[], [filter?: string]>(
    ["tasks", filter],
    () => {
      if (filter) {
        return axiosInstance
          .get(`${BASE_URL}?filter=${filter}`)
          .then((res) => res.data);
      }
      return axiosInstance.get(`${BASE_URL}`).then((res) => res.data);
    }
  );

  return {
    createTask: createTaskExistingTask,
    updateTask: updateTaskExistingTask,
    deleteTask: deleteTaskExistingTask,
    filteredTasks,
    isLoading:
      createTaskMutation.isLoading ||
      deleteTaskMutation.isLoading ||
      updateTaskMutation.isLoading,
    error:
      createTaskMutation.error ||
      deleteTaskMutation.error ||
      updateTaskMutation.error,
  };
};

export default useTask;
