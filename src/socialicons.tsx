import { Link } from "@mui/material";
import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default class SocialIcons extends React.PureComponent {
  render() {
    return (
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
    );
  }
}
