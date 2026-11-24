import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./index.css";
import App from "./App";
import { DEFAULT_SETTINGS, initialSettings } from "./lib/settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
const render = (settings, refresh) =>
  root.render(
    <React.StrictMode>
      <App initialSettings={settings} settingsRefresh={refresh} />
    </React.StrictMode>
  );

// Load the admin-center settings first (briefly), so visitors see the saved hero text straight away.
initialSettings()
  .then(({ settings, refresh }) => render(settings, refresh))
  .catch(() => render(DEFAULT_SETTINGS));
