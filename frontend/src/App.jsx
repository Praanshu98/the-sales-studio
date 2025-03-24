import { Routes, Route } from "react-router";

import Home from "./components/Home.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import Logout from "./components/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { UserProvider } from "./context/userContext.jsx";

function App() {
  return (
    <UserProvider>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 ">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
