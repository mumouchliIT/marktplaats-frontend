
import './index.css'
import App from './App.tsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { ConsentProvider } from "./components/ConsentProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConsentProvider>
      <App />
    </ConsentProvider>
  </React.StrictMode>
);
