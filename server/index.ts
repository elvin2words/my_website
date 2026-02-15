import { type Express } from "express";
import { type Server } from "node:http";

import runApp from "./app";
import { serveStatic, setupVite } from "./vite";

async function setupFullStack(app: Express, server: Server) {
  if (app.get("env") === "development") {
    await setupVite(app, server);
    return;
  }

  serveStatic(app);
}

(async () => {
  await runApp(setupFullStack);
})();
