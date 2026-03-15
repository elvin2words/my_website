import { type Express } from "express";
import { type Server } from "node:http";

import runApp from "./app";

async function setupApiOnly(_app: Express, _server: Server) {
  // API-only development entrypoint. Frontend is served separately via Vite.
}

(async () => {
  await runApp(setupApiOnly);
})();
