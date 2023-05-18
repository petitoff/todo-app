import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles/Global.scss";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
