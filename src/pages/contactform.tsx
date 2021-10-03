import React from "react";

import { Box, Button, TextField } from "@mui/material";
import SocialIcons from "../socialicons";

import snackActions from "../alert/alert";
import { useSyncState } from "../syncstate";

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

  const [emailErrorTxt, setEmailErrorTxt] = useSyncState("");
  const [fNameErrorTxt, setFNameErrorTxt] = useSyncState("");
  const [lNameErrorTxt, setLNameErrorTxt] = useSyncState("");
  const [subjErrorTxt, setSubjErrorTxt] = useSyncState("");
  const [msgErrorTxt, setMsgErrorTxt] = useSyncState("");
  const [submitEnabled, setSubmitEnabled] = useSyncState(true);

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

  const msgValidate = (event: any) => {
    _msgCheck(event.target.value);
  };

  const _msgCheck = (val: string) => {
    if (val.length < 1) {
      setMsgErrorTxt(required);
    } else {
      setMsgErrorTxt("");
    }
  };

  const checkSubmit = () => {
    const firstName = firstNameRef.current;
    if (firstName !== null) _fNameCheck(firstName.value);

    const lastName = lastNameRef.current;
    if (lastName !== null) _lNameCheck(lastName.value);

    const email = emailRef.current;
    if (email !== null) _emailCheck(email.value);

    const subject = subjRef.current;
    if (subject !== null) _subjCheck(subject.value);

    const msg = msgRef.current;
    if (msg !== null) _msgCheck(msg.value);

    if (
      subjErrorTxt() !== "" ||
      fNameErrorTxt() !== "" ||
      lNameErrorTxt() !== "" ||
      emailErrorTxt() !== "" ||
      msgErrorTxt() !== ""
    ) {
      snackActions.error("Please correct the highlighted fields");
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    setSubmitEnabled(false);

    const emailCur = emailRef.current;
    const email = emailCur ? emailCur.value : "";

    let realEmail = email ? email : "unknown";
    if (email && email.indexOf("@") === -1) realEmail += "@gmail.com";

    const textCur = msgRef.current;
    const realText = textCur ? textCur.value : "";

    const formData = new FormData();
    formData.append("email", realEmail);
    formData.append("comments", realText + " \n\n");

    const response = await fetch(
      process.env.PUBLIC_URL + "/database/emailissue.php",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      snackActions.success("Submitted!");
    } else {
      snackActions.error("Form submit failed.\nPlease try again.");
    }

    setSubmitEnabled(true);
  };

  return (
    <div className="page-content" style={{ textAlign: "center" }}>
      <div className="page-header">Contact Me</div>
      <SocialIcons />
      <div style={{ width: "90%", margin: "auto" }}>
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
              error={fNameErrorTxt() !== ""}
              helperText={fNameErrorTxt()}
              required
              size="small"
              id="firstname"
              label="First Name"
              onChange={firstNameValidate}
              onBlur={firstNameValidate}
            />
            <TextField
              inputRef={lastNameRef}
              error={lNameErrorTxt() !== ""}
              helperText={lNameErrorTxt()}
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
              error={emailErrorTxt() !== ""}
              helperText={emailErrorTxt()}
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
              error={subjErrorTxt() !== ""}
              helperText={subjErrorTxt()}
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
              error={msgErrorTxt() !== ""}
              helperText={msgErrorTxt()}
              fullWidth
              required
              multiline
              minRows={10}
              id="msgtext"
              label="Message"
              onChange={msgValidate}
              onBlur={msgValidate}
            />
          </div>
          <div>
            <Button
              style={{ border: "1px black" }}
              onClick={checkSubmit}
              disabled={!submitEnabled()}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
