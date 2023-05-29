import { useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";
import useUser from "../../hooks/userHooks/useUser";
import { API_URL } from "../../config";
import { User } from "../../types/User";

const IconWrapper = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

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
    <Container maxWidth="xs" sx={{ paddingTop: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              startIcon={
                <IconWrapper>
                  <LockOutlined />
                </IconWrapper>
              }
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
