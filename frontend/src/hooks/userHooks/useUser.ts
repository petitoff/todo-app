import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { User } from "../../types/User";
import axios from "axios";
import { setAuth } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import isTokenValid from "../../utils/isTokenValid";

const useUser = (API_URL: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = useMutation(async (user: Partial<User>) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, user);

    if (isTokenValid(data.access_token)) {
      navigate("/login");
    }
  });

  const loginUser = useMutation(async (user: Partial<User>) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, user);

    dispatch(
      setAuth({
        user: { id: data.id, email: data.email },
        token: data.access_token,
      })
    );
    navigate("/");
  });

  return { createUser, loginUser };
};

export default useUser;
