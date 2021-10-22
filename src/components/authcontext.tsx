import React from "react";

export const AuthContext = React.createContext({
  auth: false,
  setAuth: (val: boolean) => {},
});
