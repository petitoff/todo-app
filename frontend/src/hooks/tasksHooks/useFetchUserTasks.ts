import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTasks } from "../../store/slices/taskSlice";
import { Task } from "../../types/Task";

const fetchUserTasks = async (userId: number | undefined, API_URL: string) => {
  if (!userId) {
    return [];
  }

  const BASE_URL = `${API_URL}/users`;
  const response = await axios.get(`${BASE_URL}/${userId}/tasks`);
  return response.data;
};

const useFetchUserTasks = (userId: number | undefined, API_URL: string) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery<Task[], Error>(
    ["userTasks", userId],
    () => fetchUserTasks(userId, API_URL),
    {
      onSuccess: (tasks) => {
        dispatch(updateTasks(tasks));
      },
      enabled: !!userId, // Only run the query if userId is defined
    }
  );

  return { tasks: data, isLoading, error };
};

export default useFetchUserTasks;
