import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import portfolioLogo from "./assets/logo/temp.png";

const existingFavicon = document.querySelector("link[rel='icon']");
const favicon = existingFavicon || document.createElement("link");

favicon.setAttribute("rel", "icon");
favicon.setAttribute("type", "image/png");
favicon.setAttribute("href", portfolioLogo);

if (!existingFavicon) {
  document.head.appendChild(favicon);
}

document.title = "Arnav Dixit | SharePoint & SPFx Developer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);