import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { SessionProvider } from "./context/SessionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <App />
  </SessionProvider>
);
