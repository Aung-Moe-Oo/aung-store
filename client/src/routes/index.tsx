// import User from "./User";
// import Guest from "./Guest";

// const Routes = () => {
//   const isUserLoggedIn = !!localStorage.getItem("token");
//   return isUserLoggedIn ? <User /> : <Guest />;
// };

// export default Routes;

import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

const Routes = () => {
  const isUserLoggedIn = !!localStorage.getItem("token");

  return useRoutes([
    {
      path: "/",
      element: isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/menu/:id", element: <ProductDetail /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};

export default Routes;
