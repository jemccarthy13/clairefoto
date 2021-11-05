import React from "react";

// External Utilities
import { Redirect, Route, RouteProps } from "react-router-dom";

// Internal Utilities
import { AuthContext } from "./authcontext";

/**
 * A ProtectedRoute is a Route that only renders the child component
 * when the user is authenticated. If not authenticated, the route
 * redirects to the signin page.
 *
 * @param rProps RouteProps, containing a component to render and
 * the applicable route path (i.e. /mypage)
 * @returns A Route component
 */
export default function ProtectedRoute({
  component,
  path,
  ...rest
}: RouteProps): JSX.Element {
  return (
    <Route path={path} {...rest}>
      <AuthContext.Consumer>
        {(value) =>
          value.auth ? (
            component && React.createElement(component, { ...rest })
          ) : (
            <Redirect
              push
              to={{
                pathname: "/signin",
                state: { prevLocation: path },
              }}
            />
          )
        }
      </AuthContext.Consumer>
    </Route>
  );
}
