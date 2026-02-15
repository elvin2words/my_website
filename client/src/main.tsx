import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./index.css";
import "./styles/animations.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>,
);
