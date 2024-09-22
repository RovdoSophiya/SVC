import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import "../src/fonts.css";
import "../src/change-theme.css";
import App from "../src/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
