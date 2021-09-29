import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";

export default class ContactForm extends React.PureComponent {
  render(): React.ReactElement {
    return (
      <div className="my-content">
        <h3>Contact Me</h3>
        <FacebookIcon />
      </div>
    );
  }
}
