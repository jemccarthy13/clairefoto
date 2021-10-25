import React from "react";

import { Box, Button } from "@mui/material";
import { withRouter } from "react-router-dom";
import SnackActions from "../../alert/alert";
import ValidatedTextField from "../validatedtextfield";

class SignInPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  setUserName = (newname: string) => {
    this.setState({ username: newname });
  };

  setUserPassword = (passwd: string) => {
    this.setState({ password: passwd });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    e.currentTarget.form.reportValidity();

    let prevLoc = "/";
    try {
      prevLoc = this.props.history.location.state.prevLocation;
    } catch {}

    // TODO -- login auth with server / php database
    // TODO -- store this state in cookies/localstorage to provide with
    // every authenticated request? do not rely on localstorage to authenticate
    if (this.state.username === "admin" && this.state.password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      this.props.history.replace(prevLoc);
    } else {
      SnackActions.error("Invalid username/password");
    }
  };

  render = (): JSX.Element => {
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
                postValidate={this.setUserName}
              />
            </div>
            <div>
              <ValidatedTextField
                id="password"
                label="Password"
                size="small"
                postValidate={this.setUserPassword}
              />
            </div>
            <Button style={{ width: "50%" }} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Box>
        </div>
      </div>
    );
  };
}

export default withRouter(SignInPage);
