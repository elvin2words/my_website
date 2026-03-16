import { app, ensureAppReady } from "../server/app";

export default async function handler(req: any, res: any) {
  console.log(`[serverless] ${req.method} ${req.url} — cold-start: ${!res.headersSent}`);
  try {
    await ensureAppReady();
    return app(req, res);
  } catch (err) {
    console.error("[serverless] Init or request failed:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Server initialisation failed",
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  }
}
