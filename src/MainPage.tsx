import React from "react";

import { createTheme, Link, ThemeProvider } from "@mui/material";
import ContactForm from "./pages/contactform";
import PricingPage from "./pages/pricingpage";
import HomePage from "./pages/homepage";
import CouplesPage from "./pages/couplespage";
import MaternityPage from "./pages/maternitypage";
import FamilyPage from "./pages/familypage";

interface HomeProps {
  panel: string;
}

export default class MainPage extends React.Component<
  HomeProps,
  Record<string, unknown>
> {
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
              <Link href="/" underline="hover">
                Home
              </Link>
              <Link href="/#/couples" underline="hover">
                Couples
              </Link>
              <Link href="/#/maternity" underline="hover">
                Maternity
              </Link>
              <Link href="/#/family" underline="hover">
                Family
              </Link>
              <Link href="/#/pricing" underline="hover">
                Pricing
              </Link>
              <Link href="/#/portraits" underline="hover">
                Portraits
              </Link>
              <Link href="/#/contact" underline="hover">
                Contact
              </Link>
            </div>
          </div>
          {this.props.panel === "home" && <HomePage />}
          {this.props.panel === "contact" && <ContactForm />}
          {this.props.panel === "pricing" && <PricingPage />}
          {this.props.panel === "couples" && <CouplesPage />}
          {this.props.panel === "maternity" && <MaternityPage />}
          {this.props.panel === "family" && <FamilyPage />}
          {this.props.panel === "portraits" && (
            <div className="my-content">Other pages</div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
