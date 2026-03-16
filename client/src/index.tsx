import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-21v35bfkf3485r4d.us.auth0.com"
      clientId="qr3jLQpXeKDY0jeyN78gk3gwMCyTP8JY"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://graph-api",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();