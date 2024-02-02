import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import habitStore from "./store/habitsStore.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={habitStore}>
    <App />
  </Provider>
);
