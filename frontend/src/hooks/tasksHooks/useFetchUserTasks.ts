import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTasks } from "../../store/slices/taskSlice";
import { Task } from "../../types/Task";

const usefetchUserTasks = async (
  jwtToken: string | undefined,
  API_URL: string
) => {
  if (!jwtToken) {
    return [];
  }

  const response = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response.data;
};

const useFetchUserTasks = (jwtToken: string | undefined, API_URL: string) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery<Task[], Error>(
    ["userTasks", jwtToken],
    () => usefetchUserTasks(jwtToken, API_URL),
    {
      onSuccess: (tasks) => {
        dispatch(updateTasks(tasks));
      },
      enabled: !!jwtToken,
    }
  );

  return { tasks: data, isLoading, error };
};

export default useFetchUserTasks;
