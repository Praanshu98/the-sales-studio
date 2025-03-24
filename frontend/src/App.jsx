import { Routes, Route } from "react-router";
import Home from "./components/Home.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 ">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
