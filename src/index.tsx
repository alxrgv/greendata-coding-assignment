import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";

import App from "./App";

const containerSelector = "root";

const fullscreen = { width: "100%", height: "100%" };
const baseTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: { ...fullscreen },
        body: { ...fullscreen },
        ["#" + containerSelector]: {
          ...fullscreen,
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

function AppContainer() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.render(<AppContainer />, document.getElementById(containerSelector));
