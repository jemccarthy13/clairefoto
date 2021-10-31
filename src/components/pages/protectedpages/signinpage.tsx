import React from "react";

import { Box, Button } from "@mui/material";
import { withRouter } from "react-router-dom";
import SnackActions from "../../../alert/alert";
import ValidatedTextField from "../../validatedtextfield";
import { AuthContext } from "../../authcontext";
import backend from "../../../backend/backend";

class SignInPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authCallback: () => {},
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

    // TODO -- login auth with server / php
    // TODO -- store this state in cookies/localstorage to provide with
    // every authenticated request? do not rely on localstorage to authenticate
    backend
      .login({
        username: this.state.username,
        password: this.state.password,
      })
      .then(async (resp: any) => {
        if (!resp.ok) {
          SnackActions.error("Invalid username/password");
          this.state.authCallback(false);
        } else {
          //const res = await resp.json();
          // console.log(res.jwt);
          console.log(document.cookie);
          //localStorage.setItem("isAuthenticated", "true");
          this.props.history.replace(prevLoc);
          this.state.authCallback(true);
        }
      });
  };

  render = (): JSX.Element => {
    return (
      <AuthContext.Consumer>
        {(context) => {
          if (this.state.authCallback !== context.setAuth) {
            this.setState({ authCallback: context.setAuth });
          }
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
        }}
      </AuthContext.Consumer>
    );
  };
}

export default React.memo(withRouter(SignInPage));
