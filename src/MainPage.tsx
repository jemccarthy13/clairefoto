import React from "react";

export default class Home extends React.PureComponent {
  render(): React.ReactElement {
    return (
      <div className="app">
        <div className="body-content" style={{ width: "100%" }}>
          <header>Hello World</header>
        </div>
      </div>
    );
  }
}
