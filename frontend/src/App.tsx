import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./styles/Global.scss";
import HomePage from "./Pages/Home/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import { useAppSelector } from "./hooks/hooks";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme();
const queryClient = new QueryClient();

function App() {
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        queryFn: async ({ queryKey }: any) => {
          const response = await fetch(queryKey[0], {
            headers: {
              // Pobierz token z Redux stanu i dodaj go do nagłówków autoryzacji
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          return response.json();
        },
      },
    });
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" index element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
