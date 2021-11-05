import { Box, Button } from "@mui/material";
import { useState } from "react";
import SnackActions from "../../../alert/alert";
import backend from "../../../backend/backend";
import ValidatedTextField from "../../validatedtextfield";

export default function AccountEditor() {
  const [username, setUserName] = useState("");
  const [password, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVal, setNewPasswordVal] = useState("");

  const [submitEnabled, setSubmitEnabled] = useState(true);

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleSubmit() {
    console.log("submit change password");
    if (newPassword !== newPasswordVal) {
      setErrorText("Password must match");
      setError(true);
    } else {
      setSubmitEnabled(false);
      console.log(username, password, newPassword);
      backend
        .changePassword(username, password, newPassword)
        .then((resp: Response) => {
          if (resp.ok) {
            SnackActions.success("Changed password");
          } else {
            SnackActions.error(
              "Failed to change password, error code: " + resp.status
            );
          }
          setSubmitEnabled(true);
        });
    }
  }

  return (
    <div className="page-content">
      <div className="page-header">Change Password</div>
      <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
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
              id="oldpassword"
              label="Current Password"
              size="small"
              type="password"
              error={error}
              helperText={error && errorText}
              postValidate={setCurrentPassword}
            />
          </div>
          <div>
            <ValidatedTextField
              id="newpassword"
              label="New Password"
              size="small"
              type="password"
              error={error}
              helperText={error && errorText}
              postValidate={setNewPassword}
            />
          </div>
          <div>
            <ValidatedTextField
              id="passwordVal"
              label="Re-Enter Password"
              size="small"
              type="password"
              error={error}
              helperText={error && errorText}
              postValidate={setNewPasswordVal}
            />
          </div>
          <Button
            style={{ width: "50%" }}
            disabled={!submitEnabled}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}