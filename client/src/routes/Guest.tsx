import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Guest = () => {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="login" replace />,
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
