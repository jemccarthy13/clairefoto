export default function Footer() {
  return (
    <div className="my-header">
      <div style={{ padding: "20px" }}>
        &copy; 2021 Claire-Marie Fotografie
        <div style={{ float: "right" }}>
          <img
            alt="pslogo"
            src="/images/PSLogoTransparent.png"
            style={{ background: "none", verticalAlign: "bottom" }}
            height={"24px"}
            width={"24px"}
          />{" "}
          Designed by ParrotProgramming
        </div>
      </div>
    </div>
  );
}
