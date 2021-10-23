import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component, path, ...rest }: any) => {
  const isAuth = () => {
    return localStorage.getItem("isAuthenticated") === "true";
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
