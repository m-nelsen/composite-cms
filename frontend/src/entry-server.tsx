import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

/* GET requests to story API should go here so <meta> tags can be server side rendered */
export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  return { html };
}
