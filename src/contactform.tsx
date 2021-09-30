import React, { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import SocialIcons from "./socialicons";

import snackActions from "./alert/alert";
import { useSyncState } from "./syncstate";

/**
 * TODO -- This needs some styling adjustments
 */

export default function ContactForm(props: Record<string, unknown>) {
  const firstNameRef = React.createRef<HTMLInputElement>();
  const lastNameRef = React.createRef<HTMLInputElement>();
  const subjRef = React.createRef<HTMLInputElement>();
  const msgRef = React.createRef<HTMLInputElement>();
  const emailRef = React.createRef<HTMLInputElement>();

  const [emailErrorTxt, setEmailErrorTxt] = useState("");
  const [firstNameError, setFirstNameError] = useSyncState(false);
  const [lastNameError, setLastNameError] = useSyncState(false);
  const [subjectError, setSubjectError] = useSyncState(false);
  const [msgError, setMsgError] = useSyncState(false);

  const emailValidate = (event: any) => {
    _emailCheck(event.target.value);
  };

  const _emailCheck = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      setEmailErrorTxt("Invalid email");
    } else {
      setEmailErrorTxt("");
    }
  };

  const checkSubmit = () => {
    // TODO -- convert from refs to state -- manage value / errors
    const firstName = firstNameRef.current;
    if (firstName !== null) setFirstNameError(firstName.value.length < 1);

    const lastName = lastNameRef.current;
    if (lastName !== null) setLastNameError(lastName.value.length < 1);

    const email = emailRef.current;
    if (email !== null) _emailCheck(email.value);

    const subject = subjRef.current;
    if (subject !== null) setSubjectError(subject.value.length < 1);

    const msg = msgRef.current;
    if (msg !== null) setMsgError(msg.value.length < 1);

    if (
      subjectError() ||
      firstNameError() ||
      lastNameError() ||
      emailErrorTxt !== ""
    ) {
      snackActions.error("Please correct the highlighted fields");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    snackActions.success("TODO-- submit form");
  };

  return (
    <div className="my-content" style={{ textAlign: "center" }}>
      <h3>Contact Me</h3>
      <SocialIcons />
      <div style={{ width: "50%", margin: "auto" }}>
        <Box
          component="form"
          style={{
            paddingTop: "25px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div style={{ display: "inline-flex" }}>
            <TextField
              inputRef={firstNameRef}
              error={firstNameError()}
              helperText={firstNameError() && "Required"}
              required
              size="small"
              id="firstname"
              label="First Name"
            />
            <TextField
              inputRef={lastNameRef}
              error={lastNameError()}
              helperText={lastNameError() && "Required"}
              required
              size="small"
              id="lastname"
              label="Last Name"
            />
          </div>
          <div>
            <TextField
              inputRef={emailRef}
              error={emailErrorTxt !== ""}
              helperText={emailErrorTxt}
              fullWidth
              required
              id="email"
              label="Email Address"
              onBlur={emailValidate}
            />
          </div>
          <div>
            <TextField
              inputRef={subjRef}
              error={subjectError()}
              helperText={subjectError() && "Required"}
              fullWidth
              required
              id="subject"
              label="Subject"
            />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <TextField
              inputRef={msgRef}
              error={msgError()}
              helperText={msgError() && "Required"}
              fullWidth
              required
              multiline
              minRows={10}
              id="msgtext"
              label="Message"
            />
          </div>
          <div style={{ paddingBottom: "25%" }}>
            <Button style={{ border: "1px black" }} onClick={checkSubmit}>
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
