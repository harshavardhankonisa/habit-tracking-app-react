import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DetailView from "../components/DetailView/DetailView.js";
import WeekView from "../components/WeekView/WeekView.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DetailView />} />
        <Route path="/weekview" element={<WeekView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
