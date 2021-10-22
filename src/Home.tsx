import React, { useState } from "react";

import "./css/App.css";
import "./css/snackbar.css";

import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import mpTheme from "./apptheme";

import Header from "./components/header";
import HomePage from "./components/publicpages/homepage";
import CouplesPage from "./components/publicpages/picdemos/couplespage";
import MaternityPage from "./components/publicpages/picdemos/maternitypage";
import FamilyPage from "./components/publicpages/picdemos/familypage";
import PricingPage from "./components/publicpages/pricingpage";
import PortraitPage from "./components/publicpages/picdemos/portraitpage";
import ContactForm from "./components/publicpages/contactform";
import BookingPage from "./components/publicpages/bookingpage";

import { AuthContext } from "./components/authcontext";
import PricingEditor from "./components/protectedpages/pricingeditpage";
import ProtectedRoute from "./components/protectedroute";
import SignInPage from "./components/protectedpages/signinpage";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  if (/\/api\/.*/.test(window.location.pathname)) {
    return <div />;
  } else {
    return (
      <ThemeProvider theme={mpTheme}>
        <AuthContext.Provider
          value={{ auth: authenticated, setAuth: setAuthenticated }}
        >
          <div className="app">
            <Header />
            <HashRouter>
              <Link to="/*" target="_self" />
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/couples">
                <CouplesPage />
              </Route>
              <Route path="/maternity">
                <MaternityPage />
              </Route>
              <Route path="/family">
                <FamilyPage />
              </Route>
              <Route path="/pricing">
                <PricingPage />
              </Route>
              <Route path="/portraits">
                <PortraitPage />
              </Route>
              <Route path="/contact">
                <ContactForm />
              </Route>
              <Route path="/booking">
                <BookingPage />
              </Route>
              <Route path="/signin">
                <SignInPage />
              </Route>
              <ProtectedRoute path="/pricingedit">
                <PricingEditor />
              </ProtectedRoute>
            </HashRouter>
          </div>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}
