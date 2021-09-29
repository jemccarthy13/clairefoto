import React from "react";

import { createTheme, Link, ThemeProvider } from "@mui/material";
import ContactForm from "./contactform";

interface HomeState {
  panel: string;
}

export default class Home extends React.Component<
  Record<string, unknown>,
  HomeState
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      panel: "",
    };
  }

  changeTo(val: string): React.MouseEventHandler {
    return () => {
      this.setState({ panel: val });
    };
  }

  theme = createTheme({
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: "black",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontStyle: "italic",
          },
        },
      },
    },
  });

  render(): React.ReactElement {
    return (
      <ThemeProvider theme={this.theme}>
        <div className="app">
          <div className="my-header">
            <div>
              <header className="centerText">Claire-Marie</header>
              <h2 className="centerText h2-compressed">
                Photography | Fotografie
              </h2>
            </div>
            <div className="centerText linkbar">
              <Link
                href="#"
                onClick={this.changeTo("couples")}
                underline="hover"
              >
                Couples
              </Link>
              <Link
                href="#"
                onClick={this.changeTo("maternity")}
                underline="hover"
              >
                Maternity
              </Link>
              <Link
                href="#"
                onClick={this.changeTo("family")}
                underline="hover"
              >
                Family
              </Link>
              <Link
                href="#"
                onClick={this.changeTo("pricing")}
                underline="hover"
              >
                Pricing
              </Link>
              <Link
                href="#"
                onClick={this.changeTo("portraits")}
                underline="hover"
              >
                Portraits
              </Link>
              <Link
                href="#"
                onClick={this.changeTo("contact")}
                underline="hover"
              >
                Contact
              </Link>
            </div>
          </div>
          {this.state.panel === "contact" && <ContactForm />}
          {this.state.panel !== "contact" && (
            <div className="my-content">Other pages</div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
