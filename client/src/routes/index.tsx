import User from "./User";
import Guest from "./Guest";
import { useEffect, useState } from "react";

const Routes = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const valid = () => {
      setUser(localStorage.getItem("token") ? true : false);
    };
    valid();
  }, []);
  return user ? <Guest /> : <User />;
};

export default Routes;
