import React from "react";

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className="page-content">
        <div className="page-header">About Me</div>
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <img
            style={{
              width: "100%",
              textAlign: "center",
            }}
            alt="aboutme_camera"
            src="/images/aboutme_camera.png"
          />
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "20px",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          Hi and welcome to my page. My name is Claire and I love capturing
          precious moments for others. Feel free to contact me in either
          English, German or French. Please <a href="/#/contact">reach out</a>{" "}
          if you have any questions.
        </div>
      </div>
    );
  }
}
