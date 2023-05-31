import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useEffect, useState } from "react";
import Home from "../pages/Home";

const Guest = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const valid = () => {
      setUser(localStorage.getItem("token") ? true : false);
    };
    valid();
  }, []);

  return useRoutes([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);
};

export default Guest;
