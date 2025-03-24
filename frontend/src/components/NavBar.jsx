import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="bg-transparent p-4 absolute top-4 flex justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white mr-6 text-lg font-semibold">
          Home
        </Link>
        <Link to="/login" className="text-white mr-6 text-lg font-semibold">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
