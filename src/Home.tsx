import React, { Suspense } from "react";

import "./css/App.css";
import "./css/snackbar.css";

import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";
import MainPage from "./MainPage";

export default class Home extends React.PureComponent {
  render(): React.ReactElement {
    const api_regex = /\/api\/.*/;
    // if using "/api/" in the pathname, don't use React Router
    if (api_regex.test(window.location.pathname)) {
      return <div />; // must return at least an empty div
    } else {
      return (
        <div className="app" style={{ background: "white" }}>
          <div className="body-content">
            <HashRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Link to="/*" target="_self" />
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <MainPage panel={"home"} />;
                  }}
                />
                <Route
                  exact
                  path="/couples"
                  render={() => {
                    return <MainPage panel={"couples"} />;
                  }}
                />
                <Route
                  exact
                  path="/maternity"
                  render={() => {
                    return <MainPage panel={"maternity"} />;
                  }}
                />
                <Route
                  exact
                  path="/family"
                  render={() => {
                    return <MainPage panel={"family"} />;
                  }}
                />
                <Route
                  exact
                  path="/pricing"
                  render={() => {
                    return <MainPage panel={"pricing"} />;
                  }}
                />
                <Route
                  exact
                  path="/portraits"
                  render={() => {
                    return <MainPage panel={"portraits"} />;
                  }}
                />
                <Route
                  exact
                  path="/contact"
                  render={() => {
                    return <MainPage panel={"contact"} />;
                  }}
                />
                <Route
                  exact
                  path="/booking"
                  render={() => {
                    return <MainPage panel={"booking"} />;
                  }}
                />
              </Suspense>
            </HashRouter>
          </div>
        </div>
      );
    }
  }
}
