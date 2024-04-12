import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// @ts-ignore
const data = window?.composite;

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <App {...data} />
  </React.StrictMode>
);
