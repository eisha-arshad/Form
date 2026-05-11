import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import JobCard from "./components/JobCard"; // adjust path if needed

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <JobCard />
  </React.StrictMode>
);

