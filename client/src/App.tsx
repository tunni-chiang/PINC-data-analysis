import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Statistics from "./pages/statistics/Statistics";
// import Nav from "./components/nav/Nav";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<Home />}></Route>
          <Route path="/stats" element={<Statistics />}></Route>
          <Route path="/u/:username" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
