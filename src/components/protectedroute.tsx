import React from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { AuthContext } from "./authcontext";

function ProtectedRoute(props: RouteProps) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("isAuth: ", isAuthenticated);

  const { component, ...restOfProps } = props;

  const history = useHistory();

  return (
    <AuthContext.Consumer>
      {({ auth, setAuth }) => (
        <Route {...restOfProps}>
          {auth && props.children}
          {!auth && history.goBack()}
        </Route>
      )}
    </AuthContext.Consumer>
  );
}

export default ProtectedRoute;
