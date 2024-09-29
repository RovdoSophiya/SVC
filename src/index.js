import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import "../src/fonts.css";
import "../src/change-theme.css";
import "../src/normalize.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
