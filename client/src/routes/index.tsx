import User from "./User";
import Guest from "./Guest";

const Routes = () => {
  return localStorage.getItem("token") ? <User /> : <Guest />;
};

export default Routes;
