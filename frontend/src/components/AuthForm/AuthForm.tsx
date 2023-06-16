// AuthForm.tsx
import React from "react";
import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";
// import IconWrapper from "./IconWrapper";

const IconWrapper = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

interface AuthFormProps {
  title: string;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  username?: string;
  setUsername?: (value: string) => void;
  buttonLabel: string;
  handleLogin: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  buttonLabel,
  handleLogin,
}) => {
  return (
    <Container maxWidth="xs" sx={{ paddingTop: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          {typeof username !== "undefined" &&
            typeof setUsername !== "undefined" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="username"
                  label="Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
            )}
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
              {buttonLabel}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AuthForm;
