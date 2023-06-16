import { useMutation, useQuery } from "react-query";
import { Task } from "../../types/Task";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateTask,
  removeTask,
  addSubTaskToActiveTask,
  removeSubTaskFromActiveTask,
} from "../../store/slices/taskSlice";
import { useAppSelector } from "../hooks";

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

  const createSubTaskMutation = useMutation(
    async ({
      taskId,
      subTaskData,
    }: {
      taskId: number;
      subTaskData: Partial<Task>;
    }) => {
      const response = await axiosInstance.post(
        `${BASE_URL}/${taskId}/subtasks`,
        subTaskData
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(addSubTaskToActiveTask(data));
      },
    }
  );

  const updateSubTaskMutation = useMutation(
    async ({
      taskId,
      subTaskData,
    }: {
      taskId: number;
      subTaskData: Partial<Task>;
    }) => {
      const response = await axiosInstance.put(
        `${BASE_URL}/${taskId}/subtasks/${subTaskData.id}`,
        subTaskData
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(addSubTaskToActiveTask(data));
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

  const deleteSubTaskMutation = useMutation(
    async ({ taskId, subTaskId }: { taskId: number; subTaskId: number }) => {
      await axiosInstance.delete(`${BASE_URL}/${taskId}/subtasks/${subTaskId}`);
      return { taskId, subTaskId };
    },
    {
      onSuccess: ({ subTaskId }) => {
        // Remove subtask from Redux store
        dispatch(removeSubTaskFromActiveTask(subTaskId));
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

  const createSubTaskExistingTask = async (
    taskId?: number,
    subTaskData?: Partial<Task>
  ) => {
    try {
      if (!taskId || !subTaskData) {
        throw new Error("Missing task ID or subtask data");
      }

      await createSubTaskMutation.mutateAsync({ taskId, subTaskData });
    } catch (error) {
      console.error("Error creating subtask:", error);
    }
  };

  const updateTaskExistingTask = async (taskData: Partial<Task>) => {
    try {
      await updateTaskMutation.mutateAsync(taskData);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateSubTaskExistingTask = async (
    taskId?: number,
    subTaskData?: Partial<Task>
  ) => {
    try {
      if (!taskId || !subTaskData) {
        throw new Error("Missing task ID or subtask data");
      }

      await updateSubTaskMutation.mutateAsync({ taskId, subTaskData });
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  const deleteTaskExistingTask = async (taskId: number) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const deleteSubTaskExistingTask = async (
    taskId?: number,
    subTaskId?: number
  ) => {
    try {
      if (!taskId || !subTaskId) {
        throw new Error("Missing task ID or subtask ID");
      }

      await deleteSubTaskMutation.mutateAsync({ taskId, subTaskId });
    } catch (error) {
      console.error("Error deleting subtask:", error);
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
    createSubTask: createSubTaskExistingTask,
    updateTask: updateTaskExistingTask,
    updateSubTask: updateSubTaskExistingTask,
    deleteTask: deleteTaskExistingTask,
    deleteSubTask: deleteSubTaskExistingTask,
    filteredTasks,
    isLoading:
      createTaskMutation.isLoading ||
      createSubTaskMutation.isLoading ||
      updateSubTaskMutation.isLoading ||
      deleteTaskMutation.isLoading ||
      updateTaskMutation.isLoading ||
      deleteSubTaskMutation.isLoading,
    error:
      createTaskMutation.error ||
      createSubTaskMutation.error ||
      updateSubTaskMutation.error ||
      deleteTaskMutation.error ||
      updateTaskMutation.error ||
      deleteSubTaskMutation.error,
  };
};

export default useTask;
