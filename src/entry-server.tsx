import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

export function render(data: any) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App {...data} />
    </React.StrictMode>
  );
  return { html };
}
