import Cookies from "js-cookie";
import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isLogin } from '../utils';

function isLogin() {
  const token = Cookies.get("token");
  if (token) {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
