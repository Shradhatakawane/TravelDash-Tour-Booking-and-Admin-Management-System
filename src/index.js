import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/auth.css";
import "./styles/packages.css";
import "./styles/dashboard.css";
import "./styles/adminPackages.css";
import "./styles/packageDetails.css";
import "./styles/bookTour.css";
import "./styles/bookings.css";
import "./styles/contact.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
