import React from "react";
import { Cookies } from "react-cookie-consent";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component, path, ...rest }: any) => {
  const isAuth = () => {
    return Cookies.get("fotojwt") !== undefined;
  };

  const RouteComponent = (props: any) =>
    isAuth() ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        push
        to={{
          pathname: "/signin",
          state: { prevLocation: path },
        }}
      />
    );
  return (
    <Route path={path} {...rest}>
      <RouteComponent {...rest} />
    </Route>
  );
};

export default ProtectedRoute;
