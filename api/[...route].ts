import type { NextFunction, Request, Response } from "express";

import { app } from "../server/app";
import { registerRoutes } from "../server/routes";

let initialized = false;
let initPromise: Promise<void> | null = null;

async function ensureInitialized() {
  if (initialized) {
    return;
  }

  if (!initPromise) {
    initPromise = (async () => {
      await registerRoutes(app);

      app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err?.status || err?.statusCode || 500;
        const message = err?.message || "Internal Server Error";

        if (!res.headersSent) {
          res.status(status).json({ message });
        }
      });

      initialized = true;
    })();
  }

  await initPromise;
}

export default async function handler(req: any, res: any) {
  await ensureInitialized();
  return app(req, res);
}
