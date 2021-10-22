import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./css/theme.css";
// import reportWebVitals from "./reportWebVitals";

import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import Home from "./Home";
import GlobalSnackbarProvider from "./alert/globalalertprovider";
import CookieConsent from "react-cookie-consent";

require("typeface-playfair-display");
require("typeface-nunito");
require("typeface-satisfy");

export default ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalSnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Home />
      </GlobalSnackbarProvider>
    </Suspense>
    <CookieConsent
      location="top"
      style={{ backgroundColor: "#a0a1a0", border: "2px solid grey" }}
    >
      This website uses cookies to enhance the user experience. To learn more,
      please see the release notes.
    </CookieConsent>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
