import React, { useState } from "react";

// Internal Utilities
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Cookies } from "react-cookie-consent";

// Internal Utilities
import SnackActions from "../../../alert/alert";
import ValidatedTextField from "../../validatedtextfield";
import { AuthContext } from "../../authcontext";
import backend from "../../../backend/backend";

// MUI Library
import { Box, Button, CircularProgress } from "@mui/material";

/**
 * Component to render the SignIn page UI
 */
function SignInPage(props: RouteComponentProps): JSX.Element {
  // storage values for username / password
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");

  // flag to disable submit when request pending
  const [submitEnabled, setSubmitEnabled] = useState(true);

  /**
   * Handler for submit button press.
   *
   * @param authCallback From the AuthContext, should be setAuth
   * and will toggle the auth state based on server response
   * @returns onClick compatible function with reference to
   * the authcallback
   */
  function handleSubmit(authCallback: (b: boolean) => void) {
    // create the return function
    const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
      // prevent the default submit action
      e.preventDefault();

      // report validity of the form (display MUI error messages)
      // based on field validation
      let formValid = false;
      if (e.currentTarget.form) {
        formValid = e.currentTarget.form.reportValidity();
      }

      // If we were forced here from a protected route, remember
      // where we came from. Otherwise, redirect to the dashboard.
      let prevLoc = "/";
      let locState = props.location.state as any;
      if (locState && locState.prevLocation) {
        prevLoc = locState.prevLocation;
      }

      if (formValid) {
        // Disable button when request is pending
        setSubmitEnabled(false);

        // Send login request to server
        backend.login(username, password).then(async (resp: Response) => {
          // Bad response = logout
          // Notify the user, unset jwt, set auth state false, re-enable submit
          if (!resp.ok) {
            SnackActions.error("Invalid username/password");
            Cookies.remove("fotojwt");
            authCallback(false);
            setSubmitEnabled(true);
          } else {
            // Good response = set auth true
            // Store the jwt, update auth state
            // Then redirect to prev page || dashboard
            const res = await resp.json();
            const d = new Date(0);
            d.setUTCSeconds(res.expires);

            Cookies.set("fotojwt", res.jwt, { expires: d });
            authCallback(true);

            props.history.push(prevLoc);
          }
        });
      }
    };
    return handler;
  }

  return (
    <AuthContext.Consumer>
      {(context) => {
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
                    postValidate={setUserName}
                  />
                </div>
                <div>
                  <ValidatedTextField
                    id="password"
                    label="Password"
                    size="small"
                    type="password"
                    postValidate={setUserPassword}
                  />
                </div>
                <Button
                  style={{ width: "50%" }}
                  disabled={!submitEnabled}
                  onClick={handleSubmit(context.setAuth)}
                >
                  Submit{" "}
                  {!submitEnabled && (
                    <CircularProgress
                      style={{ marginLeft: "12px" }}
                      size={"16px"}
                    />
                  )}
                </Button>
              </Box>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

// withRouter provides navigation/history
export default React.memo(withRouter(SignInPage));
