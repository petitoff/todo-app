import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/Global.scss";
import HomePage from "./Pages/Home/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" index element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
