import React, { useRef, useState } from "react";

// import { Box, Link, TextField } from "@material-ui/core";
import { Box, Button, Link, TextField } from "@mui/material";
import SocialIcons from "./socialicons";

import snackActions from "./alert/alert";

/**
 * TODO -- This needs some styling adjustments
 */

export default function ContactForm(props: Record<string, unknown>) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const subjRef = useRef(null);
  const msgRef = useRef(null);

  const [emailErrorTxt, setEmailErrorTxt] = useState("");

  const emailValidate = (event: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(event.target.value)) {
      setEmailErrorTxt("Invalid email");
    } else {
      setEmailErrorTxt("");
    }
  };

  const checkSubmit = () => {
    if (emailErrorTxt) {
      snackActions.error(emailErrorTxt);
    }
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
              ref={firstNameRef}
              required
              size="small"
              id="firstname"
              label="First Name"
            />
            <TextField
              ref={lastNameRef}
              required
              size="small"
              id="lastname"
              label="Last Name"
            />
          </div>
          <div>
            <TextField
              error={emailErrorTxt !== ""}
              helperText={emailErrorTxt}
              fullWidth
              onBlur={emailValidate}
              required
              id="email"
              label="Email Address"
            />
          </div>
          <div>
            <TextField fullWidth required id="subject" label="Subject" />
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <TextField
              fullWidth
              multiline
              minRows={10}
              required
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
