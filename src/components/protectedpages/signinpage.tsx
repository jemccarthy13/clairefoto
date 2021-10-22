import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SnackActions from "../../alert/alert";
import ValidatedTextField from "../validatedtextfield";

function SignInPage() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const history = useHistory();

  const setUserName = (newname: string) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        username: newname,
      };
    });
  };
  const setUserPassword = (passwd: string) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        password: passwd,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.currentTarget.form.reportValidity();

    // TODO -- login auth with php

    if (userData.username === "admin" && userData.password === "123456") {
      //Signin Success
      localStorage.setItem("isAuthenticated", "true");
      history.goBack();
    } else {
      SnackActions.error("Invalid username/password");
    }
  };

  return (
    <div className="page-content" style={{ textAlign: "center" }}>
      <div className="page-header">Signin User</div>

      <div style={{ width: "90%", margin: "auto" }}>
        <Box
          component="form"
          style={{
            paddingTop: "25px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div>
            <ValidatedTextField
              id="username"
              label="Username"
              size="small"
              postValidate={setUserName}
            />
          </div>
          <div>
            <ValidatedTextField
              id="password"
              label="Password"
              size="small"
              postValidate={setUserPassword}
            />
          </div>
          <Button style={{ width: "50%" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default SignInPage;
