import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import habitStore from "./store/habitsStore.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DetailView from "./pages/DetailView/DetailView.js";
import WeekView from "./pages/WeekView/WeekView.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={habitStore}>
    <Router>
      <Routes>
        <Route path="/" element={<DetailView />} />
        <Route path="/weekview" element={<WeekView />} />
      </Routes>
    </Router>
  </Provider>
);
