import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import { Auth0Provider } from "@auth0/auth0-react";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Auth0Provider
     domain="dev-yyv931t0.us.auth0.com"
     clientId="t1ne26B1PJ6odB5raxD1HBlrkxi5o9og"
     redirectUri={window.location.origin}
    >
     <App />
    </Auth0Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
