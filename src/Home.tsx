import React, { Suspense } from "react";

import "./css/App.css";
import "./css/snackbar.css";

import { Route } from "react-router";
import { HashRouter } from "react-router-dom";
import MainPage from "./MainPage";

export default class Home extends React.PureComponent {
  render(): React.ReactElement {
    return (
      <div className="app" style={{ background: "white" }}>
        <div className="body-content">
          <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Route
                exact
                path="/"
                render={() => {
                  return <MainPage panel={"home"} />;
                }}
              />
              <Route
                path="/couples"
                render={() => {
                  return <MainPage panel={"couples"} />;
                }}
              />
              <Route
                path="/maternity"
                render={() => {
                  return <MainPage panel={"maternity"} />;
                }}
              />{" "}
              <Route
                path="/family"
                render={() => {
                  return <MainPage panel={"family"} />;
                }}
              />
              <Route
                path="/pricing"
                render={() => {
                  return <MainPage panel={"pricing"} />;
                }}
              />
              <Route
                path="/portraits"
                render={() => {
                  return <MainPage panel={"portraits"} />;
                }}
              />{" "}
              <Route
                path="/contact"
                render={() => {
                  return <MainPage panel={"contact"} />;
                }}
              />
            </Suspense>
          </HashRouter>
        </div>
      </div>
    );
  }
}
