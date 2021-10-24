import React from "react";

import { Box, Button } from "@mui/material";
import SocialIcons from "../../socialicons";

import snackActions from "../../alert/alert";
import { useSyncState } from "../../syncstate";
import ValidatedTextField from "../validatedtextfield";

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

    try {
      // TODO -- build API for this?
      const response = await fetch(
        process.env.PUBLIC_URL + "/database/contactme.php",
        {
          method: "POST",
          body: contactData,
        }
      );

      await fetch(process.env.PUBLIC_URL + "/database/contactconfirm.php", {
        method: "POST",
        body: confirmData,
      });

      if (response.ok) {
        success = true;
      }
    } catch {
      // do nothing
    }

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
      </div>
    </div>
  );
}
