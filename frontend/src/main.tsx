import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const clerk_pub_key = import.meta.env.VITE_CLERK_API_KEY;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerk_pub_key}>
      <Toaster />
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
