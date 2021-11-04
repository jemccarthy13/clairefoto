import React from "react";

import { Box, Button } from "@mui/material";
import { withRouter } from "react-router-dom";
import SnackActions from "../../../alert/alert";
import ValidatedTextField from "../../validatedtextfield";
import { AuthContext } from "../../authcontext";
import backend from "../../../backend/backend";

import { Cookies } from "react-cookie-consent";

class SignInPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitEnabled: true,
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

    this.setState({ submitEnabled: false });
    backend
      .login(this.state.username, this.state.password)
      .then(async (resp: any) => {
        if (!resp.ok) {
          SnackActions.error("Invalid username/password");
          this.state.authCallback(false);
        } else {
          const res = await resp.json();
          const d = new Date(0);
          d.setUTCSeconds(res.expires);

          Cookies.set("fotojwt", res.jwt, { expires: d });

          this.props.history.replace(prevLoc);
          this.state.authCallback(true);
        }
        this.setState({ submitEnabled: true });
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
              <div className="page-header">Signin</div>

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
                      type="password"
                      postValidate={this.setUserPassword}
                    />
                  </div>
                  <Button
                    style={{ width: "50%" }}
                    disabled={!this.state.submitEnabled}
                    onClick={this.handleSubmit}
                  >
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
