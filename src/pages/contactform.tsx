import React from "react";

import { Box, Button } from "@mui/material";
import SocialIcons from "../socialicons";

import snackActions from "../alert/alert";
import { useSyncState } from "../syncstate";
import ValidatedTextField from "./validatedtextfield";

export default function ContactForm(props: Record<string, unknown>) {
  // form fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubj] = React.useState("");
  const [content, setMsgTxt] = React.useState("");

  // disable submit when request in progress
  const [submitEnabled, setSubmitEnabled] = useSyncState(true);

  const checkSubmit = (event: any) => {
    let formValid = true;

    event.currentTarget.form.reportValidity();

    if (firstName === "") formValid = false;
    if (lastName === "") formValid = false;
    if (email === "") formValid = false;
    if (subject === "") formValid = false;
    if (content === "") formValid = false;

    if (formValid) {
      submitForm();
    }
  };

  const submitForm = async () => {
    setSubmitEnabled(false);
    let realEmail = email ? email : "unknown";
    if (email && email.indexOf("@") === -1) realEmail += "@gmail.com";

    const formData = new FormData();
    formData.append("email", realEmail);
    formData.append("comments", content + " \n\n");

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
        <form>
          <Box
            component="form"
            style={{
              paddingTop: "25px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div style={{ display: "inline-flex" }}>
              <ValidatedTextField
                id="firstname"
                label="First Name"
                postValidate={setFirstName}
                size="small"
              />
              <ValidatedTextField
                id="lastname"
                label="Last Name"
                postValidate={setLastName}
                size="small"
              />
            </div>
            <div>
              <ValidatedTextField
                id="email"
                label="Email Address"
                postValidate={setEmail}
                email
                size="small"
                fullWidth
              />
            </div>
            <div>
              <ValidatedTextField
                id="subject"
                label="Subject"
                postValidate={setSubj}
                fullWidth
              />
            </div>
            <div style={{ paddingBottom: "20px" }}>
              <ValidatedTextField
                id="msgtext"
                label="Message"
                postValidate={setMsgTxt}
                fullWidth
                multiline
                minRows={10}
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
        </form>
      </div>
    </div>
  );
}
