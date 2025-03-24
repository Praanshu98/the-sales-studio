import { Link } from "react-router";

import useUserContext from "../context/userContext.jsx";

const NavBar = () => {
  const { user } = useUserContext();

  return (
    <nav className="bg-transparent p-4 absolute top-4 flex justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white mr-6 text-lg font-semibold">
          Home
        </Link>
        {user ? (
          <div>
            <Link to="/admin" className="text-white mr-6 text-lg font-semibold">
              Admin
            </Link>
            <Link
              to="/logout"
              className="text-white mr-6 text-lg font-semibold"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link to="/login" className="text-white mr-6 text-lg font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
