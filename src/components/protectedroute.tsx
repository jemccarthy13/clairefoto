import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component, path, ...rest }: any) => {
  const routeComponent = (props: any) =>
    localStorage.getItem("isAuthenticated") === "true" ? (
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
  return <Route path={path} {...rest} render={routeComponent} />;
};

export default ProtectedRoute;
