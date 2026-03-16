import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;
// Prevent WebSocket connection from hanging indefinitely in serverless environments.
neonConfig.wsProxy = neonConfig.wsProxy; // keep existing value if set
neonConfig.fetchConnectionCache = true;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Throw lazily (at module evaluation from a dynamic import) so the rest of
  // the server can still start without a database configured. The
  // ResilientContactStorage in storage.ts catches this and falls back to
  // in-memory mode automatically.
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString,
  // Hard limit: a single Neon WebSocket connection must not hang the
  // serverless function beyond its maxDuration. 8 s gives a safe margin
  // under Vercel's default 10 s and our configured 30 s.
  connectionTimeoutMillis: 8_000,
});
export const db = drizzle({ client: pool, schema });
