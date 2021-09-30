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

  const required = "Required";

  const [emailErrorTxt, setEmailErrorTxt] = useState("");
  const [fNameErrorTxt, setFNameErrorTxt] = useState("");
  const [lNameErrorTxt, setLNameErrorTxt] = useState("");
  const [subjErrorTxt, setSubjErrorTxt] = useState("");
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

  const firstNameValidate = (event: any) => {
    _fNameCheck(event.target.value);
  };

  const _fNameCheck = (val: string) => {
    if (val.length < 1) {
      setFNameErrorTxt(required);
    } else {
      setFNameErrorTxt("");
    }
  };

  const lastNameValidate = (event: any) => {
    _lNameCheck(event.target.value);
  };

  const _lNameCheck = (val: string) => {
    if (val.length < 1) {
      setLNameErrorTxt(required);
    } else {
      setLNameErrorTxt("");
    }
  };

  const subjValidate = (event: any) => {
    _subjCheck(event.target.value);
  };

  const _subjCheck = (val: string) => {
    if (val.length < 1) {
      setSubjErrorTxt(required);
    } else {
      setSubjErrorTxt("");
    }
  };

  const checkSubmit = () => {
    // TODO -- convert from refs to state -- manage value / errors
    const firstName = firstNameRef.current;
    if (firstName !== null) _fNameCheck(firstName.value);

    const lastName = lastNameRef.current;
    if (lastName !== null) _lNameCheck(lastName.value);

    const email = emailRef.current;
    if (email !== null) _emailCheck(email.value);

    const subject = subjRef.current;
    if (subject !== null) _subjCheck(subject.value);

    const msg = msgRef.current;
    if (msg !== null) setMsgError(msg.value.length < 1);

    if (
      subjErrorTxt !== "" ||
      fNameErrorTxt !== "" ||
      lNameErrorTxt !== "" ||
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
              error={fNameErrorTxt !== ""}
              helperText={fNameErrorTxt}
              required
              size="small"
              id="firstname"
              label="First Name"
              onChange={firstNameValidate}
              onBlur={firstNameValidate}
            />
            <TextField
              inputRef={lastNameRef}
              error={lNameErrorTxt !== ""}
              helperText={lNameErrorTxt}
              required
              size="small"
              id="lastname"
              label="Last Name"
              onChange={lastNameValidate}
              onBlur={lastNameValidate}
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
              error={subjErrorTxt !== ""}
              helperText={subjErrorTxt}
              fullWidth
              required
              id="subject"
              label="Subject"
              onChange={subjValidate}
              onBlur={subjValidate}
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
