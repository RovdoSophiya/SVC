import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";
import App from "./App";
import "./index.css";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
