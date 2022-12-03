import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";

ReactDOM.render(
  <HashRouter basename="/">
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </HashRouter>,
  document.getElementById("root")
);
