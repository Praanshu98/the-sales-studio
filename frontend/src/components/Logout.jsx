import useUserContext from "../context/userContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    setUser(null);
    navigate("/");
  }, []);

  return;
};

export default Logout;
