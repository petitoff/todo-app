import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import useUser from "../../hooks/userHooks/useUser";
import { API_URL } from "../../config";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { createUser } = useUser(API_URL);

  const handleSignup = () => {
    const user = {
      username,
      email,
      password,
    };

    createUser.mutate(user);
  };

  return (
    <AuthForm
      title={"Signup"}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      buttonLabel={"Signup"}
      handleLogin={handleSignup}
    />
  );
};

export default SignupPage;
