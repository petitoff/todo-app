import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { User } from "../../types/User";
import axios from "axios";
import { setAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

const useUser = (API_URL: string) => {
  const auth = useAppSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = useMutation(async (user: User) => {
    const { data } = await axios.post(`${API_URL}/users`, user);
    return data.id;
  });

  const loginUser = useMutation(async (user: Partial<User>) => {
    const { data } = await axios.post(`${API_URL}/users/login`, user);
    dispatch(setAuth(data));
    navigate("/");
  });

  const { data: tasks } = useQuery(["tasks", auth?.id], () =>
    axios.get(`${API_URL}/users/${auth?.id}/tasks`)
  );

  return { tasks, createUser, loginUser };
};

export default useUser;
