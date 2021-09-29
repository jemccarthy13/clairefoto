import React, { Suspense } from "react";
import "./css/App.css";

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
              <Route exact path="/" component={MainPage} />
            </Suspense>
          </HashRouter>
        </div>
      </div>
    );
  }
}
