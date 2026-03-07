import React from "react";
import { useUser } from "../../context/UserContext";
import Login from "../../pages/Login";

const Auth = (props) => {
  const { user } = useUser();

  return <>{user?._id ? props.children : <Login />}</>;
};

export default Auth;
