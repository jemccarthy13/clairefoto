import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// import { Box, Link, TextField } from "@material-ui/core";
import { Box, Button, Link, TextField } from "@mui/material";

interface CFormState {
  emailErrorTxt: string;
}

/**
 * TODO -- This needs some styling adjustments
 */

export default class ContactForm extends React.Component<
  Record<string, unknown>,
  CFormState
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      emailErrorTxt: "",
    };
  }

  emailValidate = (event: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(event.target.value)) {
      this.setState({ emailErrorTxt: "Invalid email" });
    } else {
      this.setState({ emailErrorTxt: "" });
    }
  };

  render(): React.ReactElement {
    return (
      <div className="my-content" style={{ textAlign: "center" }}>
        <h3>Contact Me</h3>
        <div>
          <Link
            href="https://www.facebook.com/clairemariefotografie"
            target="_blank"
          >
            <FacebookIcon style={{ fill: "#4267B2" }} />
          </Link>
          <Link
            href="https://www.instagram.com/clairemariefotografie"
            target="_blank"
          >
            <InstagramIcon />
          </Link>
          <Link href="mailto:clairemariefotografie@yahoo.de">
            <MailOutlineIcon />
          </Link>
        </div>
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
                required
                size="small"
                id="firstname"
                label="First Name"
              />
              <TextField
                required
                size="small"
                id="lastname"
                label="Last Name"
              />
            </div>
            <div>
              <TextField
                error={this.state.emailErrorTxt !== ""}
                helperText={
                  this.state.emailErrorTxt !== "" ? "Invalid email" : ""
                }
                fullWidth
                onBlur={this.emailValidate}
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
              <Button style={{ border: "1px black" }}>Submit</Button>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}
