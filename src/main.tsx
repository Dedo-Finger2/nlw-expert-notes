import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";
import { Toaster } from "sonner";
import { Footer } from "./components/footer";

function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        richColors
        position="top-center"
        className="z-[99999]"
        closeButton
      />
      <div className="mb-auto">
        <App />
      </div>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
