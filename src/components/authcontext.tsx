import React from "react";

export const AuthContext = React.createContext({
  auth: false,
  token: "",
  setAuth: (val: boolean) => {},
  setToken: (val: string) => {},
});
