import React from "react";

/**
 * A simple React context that stores:
 * - auth: true iff user is authenticated
 * - setAuth: function to change auth state
 */
export const AuthContext = React.createContext({
  auth: false,
  setAuth: (val: boolean) => {},
});
