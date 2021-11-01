import React, { Suspense, useEffect, useState } from "react";

import "./css/snackbar.css";

import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";
import { CircularProgress, ThemeProvider } from "@mui/material";

import mpTheme from "./apptheme";

import Header from "./components/header";

import { AuthContext } from "./components/authcontext";
import ProtectedRoute from "./components/protectedroute";
import { Cookies } from "react-cookie-consent";
import Footer from "./components/footer";

const HomePage = React.lazy(() => import("./components/pages/home"));
const PhotoPage = React.lazy(
  () => import("./components/pages/publicpages/portfolio/photopage")
);
const ContactForm = React.lazy(
  () => import("./components/pages/publicpages/contactform")
);
const PricingPage = React.lazy(
  () => import("./components/pages/publicpages/pricingpage")
);
const BookingPage = React.lazy(
  () => import("./components/pages/publicpages/bookingpage")
);
const SignInPage = React.lazy(
  () => import("./components/pages/protectedpages/signinpage")
);
const PricingEditor = React.lazy(
  () => import("./components/pages/protectedpages/pricingeditpage")
);
const BookingEditor = React.lazy(
  () => import("./components/pages/protectedpages/bookingeditpage")
);

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (Cookies.get("fotojwt") !== undefined) {
      setAuthenticated(true);
    }
  }, []);

  if (/\/api\/.*/.test(window.location.pathname)) {
    return <div />;
  } else {
    return (
      <ThemeProvider theme={mpTheme}>
        <AuthContext.Provider
          value={{
            auth: authenticated,
            setAuth: setAuthenticated,
            token: token,
            setToken: setToken,
          }}
        >
          <div className="app">
            <Header />
            <Suspense
              fallback={
                <div className="page-content" style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              }
            >
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
                    serverDir="portrait"
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
                <ProtectedRoute path="/bookingedit" component={BookingEditor} />
              </HashRouter>
            </Suspense>
            {false && <Footer />}
          </div>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}
