import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Guest = () => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to={"/login"} /> },
  ]);
};

export default Guest;
