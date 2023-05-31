import User from "./User";
import Guest from "./Guest";

const Routes = () => {
  const isUserLoggedIn = !!localStorage.getItem("token");
  return isUserLoggedIn ? <User /> : <Guest />;
};

export default Routes;
