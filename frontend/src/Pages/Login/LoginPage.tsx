import { useState } from "react";
import useUser from "../../hooks/userHooks/useUser";
import { API_URL } from "../../config";
import { User } from "../../types/User";
import AuthForm from "../../components/AuthForm/AuthForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useUser(API_URL);

  const handleLogin = () => {
    const user: Partial<User> = {
      email,
      password,
    };

    loginUser.mutate(user);
  };

  return (
    <AuthForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      title={"Login"}
      buttonLabel={"Login"}
      handleLogin={handleLogin}
    />
  );
};

export default LoginPage;
