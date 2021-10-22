import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: "10px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          padding: "10px",
          maxWidth: "calc(60%)",
          fontSize: "1.1vmax",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#eee",
          cursor: "pointer",
          padding: "10px",
          border: "none",
          textAlign: "left",
          outline: "none",
          fontSize: "15px",
          width: "95%",
          borderRadius: "10px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "black",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
          fontStyle: "italic",
        },
      },
    },
  },
});
