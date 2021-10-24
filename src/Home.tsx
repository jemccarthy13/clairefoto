import React, { useEffect, useState } from "react";

import "./css/App.css";
import "./css/snackbar.css";

import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import mpTheme from "./apptheme";

import Header from "./components/header";
import HomePage from "./components/publicpages/homepage";
import PricingPage from "./components/publicpages/pricingpage";
import ContactForm from "./components/publicpages/contactform";
import BookingPage from "./components/publicpages/bookingpage";

import { AuthContext } from "./components/authcontext";
import PricingEditor from "./components/protectedpages/pricingeditpage";
import ProtectedRoute from "./components/protectedroute";
import SignInPage from "./components/protectedpages/signinpage";
import PhotoPage from "./components/publicpages/portfolio/photopage";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      setAuthenticated(true);
    }
  }, []);

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
                <PhotoPage title="Couples" serverDir="couples" />
              </Route>
              <Route path="/maternity">
                <PhotoPage title="Maternity" serverDir="maternity" />
              </Route>
              <Route path="/family">
                <PhotoPage title="Family" serverDir="family" />
              </Route>
              <Route path="/portraits">
                <PhotoPage
                  title={"Portraits & Senior Sessions"}
                  serverDir="portraits"
                />
              </Route>
              <Route path="/pricing">
                <PricingPage />
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
              <ProtectedRoute path="/pricingedit" component={PricingEditor} />
            </HashRouter>
          </div>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}
