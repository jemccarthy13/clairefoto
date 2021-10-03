import React from "react";

import { createTheme, Link, ThemeProvider } from "@mui/material";
import ContactForm from "./pages/contactform";
import PricingPage from "./pages/pricingpage";
import HomePage from "./pages/homepage";
import CouplesPage from "./pages/couplespage";
import MaternityPage from "./pages/maternitypage";

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
      MuiTextField: {
        styleOverrides: {
          root: {
            padding: "10px",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            padding: "10px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#eee",
            //color: "#444",
            cursor: "pointer",
            padding: "10px",
            border: "none",
            textAlign: "left",
            outline: "none",
            fontSize: "15px",
            width: "95%",
            borderRadius: "10px",
          },
        },
      },
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
              <Link href="#" onClick={this.changeTo("home")} underline="hover">
                Home
              </Link>
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
          {this.state.panel === "home" && <HomePage />}
          {this.state.panel === "contact" && <ContactForm />}
          {this.state.panel === "pricing" && <PricingPage />}
          {this.state.panel === "couples" && <CouplesPage />}
          {this.state.panel === "maternity" && <MaternityPage />}
          {(this.state.panel === "portraits" ||
            this.state.panel === "family") && (
            <div className="my-content">Other pages</div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
