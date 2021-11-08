import React from "react";

import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import SocialIcons from "../../../socialicons";

import snackActions from "../../../alert/alert";
import { useSyncState } from "../../../syncstate";
import ValidatedTextField from "../../validatedtextfield";
import backend from "../../../backend/backend";

export default function ContactForm(props: Record<string, unknown>) {
  // form fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmail] = React.useState("");
  const [subject, setSubj] = React.useState("");
  const [content, setMsgTxt] = React.useState("");

  // disable submit when request in progress
  const [submitEnabled, setSubmitEnabled] = useSyncState(true);

  const checkSubmit = (event: any) => {
    let formValid = event.currentTarget.form.reportValidity();

    formValid = formValid && emailAddress !== "";

    if (emailAddress === "") {
      snackActions.error("Please correct the highlighted fields.");
    }
    if (formValid) {
      submitForm();
    }
  };

  const submitForm = async () => {
    setSubmitEnabled(false);

    let to = process.env.REACT_APP_CONTACT_EMAIL;
    if (to === undefined) to = "";
    const contactData = new FormData();
    contactData.append("email", emailAddress);
    contactData.append("subj", subject);
    contactData.append("send_to", to);
    contactData.append("comments", content + " \n\n");

    const confirmData = new FormData();
    confirmData.append("email", emailAddress);
    confirmData.append("first_name", firstName);
    confirmData.append("last_name", lastName);

    let success = false;

    const response = await backend.contactFormSubmit(contactData, confirmData);
    success = response.ok;

    if (success) {
      snackActions.success("Submitted!");
    } else {
      snackActions.error("Form submit failed. Please try again later.");
    }

    setSubmitEnabled(true);
  };

  return (
    <div className="page-content" style={{ textAlign: "center", width: "50%" }}>
      <div className="page-header">Contact Me</div>
      <SocialIcons />
      <div style={{ width: "90%", margin: "auto" }}>
        <Grid container component="form">
          <Grid item xs={6}>
            <ValidatedTextField
              id="firstname"
              label="First Name"
              postValidate={setFirstName}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <ValidatedTextField
              id="lastname"
              label="Last Name"
              postValidate={setLastName}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedTextField
              id="email"
              label="Email Address"
              postValidate={setEmail}
              email
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ValidatedTextField
              id="subject"
              label="Subject"
              postValidate={setSubj}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: "20px" }}>
            <ValidatedTextField
              id="msgtext"
              label="Message"
              postValidate={setMsgTxt}
              fullWidth
              multiline
              minRows={10}
            />
          </Grid>
          <Grid item xs={6} style={{ margin: "auto" }}>
            <Button
              style={{ border: "1px black" }}
              onClick={checkSubmit}
              onSubmit={checkSubmit}
              disabled={!submitEnabled()}
            >
              Submit{" "}
              {!submitEnabled() && (
                <CircularProgress
                  style={{ marginLeft: "12px" }}
                  size={"16px"}
                />
              )}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
