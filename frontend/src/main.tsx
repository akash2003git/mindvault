import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <style>
      {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
          body {
            font-family: 'Montserrat', sans-serif;
          }
        `}
    </style>
    <App />
  </StrictMode>,
);
