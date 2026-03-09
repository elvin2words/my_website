import { app, ensureAppReady } from "../server/app";

export default async function handler(req: any, res: any) {
  await ensureAppReady();
  return app(req, res);
}
