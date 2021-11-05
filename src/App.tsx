import React, { Suspense, useEffect, useState } from "react";

// Routes / Router
import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";

// Cookies
import { Cookies } from "react-cookie-consent";

// MUI library
import { CircularProgress, ThemeProvider } from "@mui/material";

// Main theme & css
import mpTheme from "./apptheme";
import "./css/snackbar.css";

// Internal Utilities
import { AuthContext } from "./components/authcontext";
import ProtectedRoute from "./components/protectedroute";

// Visual Components
import Header from "./components/header";
import Footer from "./components/footer";

/**
 * Lazy load all visual components
 */
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
const AccountEditor = React.lazy(
  () => import("./components/pages/protectedpages/accounteditpage")
);

/**
 * A react functional component for the web application.
 * @returns Application JSX.Element
 */
export default function App(): JSX.Element {
  // Authenticated state for the entire app.
  // This state value is "provided" to the rest of the
  // application using the AuthContext.Provider (see render)
  const [authenticated, setAuthenticated] = useState(false);

  // useEffect with [] dependency is called when component
  // is mounted. On mount, set initial auth state if
  // the fotojwt token is set in cookies.
  useEffect(() => {
    if (Cookies.get("fotojwt") !== undefined) {
      setAuthenticated(true);
    }
  }, []);

  return (
    /* Provide the global theme for MUI elements */
    <ThemeProvider theme={mpTheme}>
      {/* Provide authentication state for the rest of the app */}
      <AuthContext.Provider
        value={{
          auth: authenticated,
          setAuth: setAuthenticated,
        }}
      >
        {/* Here is the real main 'application' UI */}
        <div className="app">
          {/* Render the header (nav bar and title) */}
          <Header />

          {/* For lazy load, provide the placeholder (circular spinner) 
              while a page is lazy loading */}
          <Suspense
            fallback={
              <div className="page-content" style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            }
          >
            {/* Use a HashRouter to provide the page content based on 
                the navigation bar targets */}
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
              {/* Use ProtectedRoute for jwt-protected routes */}
              <ProtectedRoute path="/pricingedit" component={PricingEditor} />
              <ProtectedRoute path="/bookingedit" component={BookingEditor} />
              <ProtectedRoute path="/accountedit" component={AccountEditor} />
            </HashRouter>
          </Suspense>
          {/* TODO -- false is a placeholder to prevent the footer from rendering 
                   -- More work is needed on the footer, 
                   -- if there even will be one*/}
          {false && <Footer />}
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
