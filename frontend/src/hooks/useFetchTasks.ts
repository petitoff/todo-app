// src/useFetchTasks.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTasks } from "../store/slices/taskSlice";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const useFetchTasks = (apiEndpoint: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(apiEndpoint);

        setTasks(response.data);
        dispatch(updateTasks(response.data));
        setError(null);
      } catch (err: any) {
        setError(err);
      }

      setIsLoading(false);
    };

    fetchTasks();
  }, [apiEndpoint]);

  return { tasks, isLoading, error };
};

export default useFetchTasks;
