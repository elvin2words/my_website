import { type Server } from "node:http";

import express, {
  type Express,
  type Request,
  Response,
  NextFunction,
} from "express";

import { registerRoutes } from "./routes";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export const app = express();
let initializedServer: Server | null = null;
let initializationPromise: Promise<Server> | null = null;

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

function attachErrorHandler() {
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (!res.headersSent) {
      res.status(status).json({ message });
    }
    console.error(err);
  });
}

export async function ensureAppReady() {
  if (initializedServer) {
    return initializedServer;
  }

  if (!initializationPromise) {
    initializationPromise = (async () => {
      console.log("[app] registerRoutes: starting");
      try {
        const server = await registerRoutes(app);
        attachErrorHandler();
        initializedServer = server;
        console.log("[app] registerRoutes: complete");
        return server;
      } catch (err) {
        // Reset so the next request can retry rather than returning the same
        // rejected promise forever.
        initializationPromise = null;
        console.error("[app] registerRoutes: failed —", err);
        throw err;
      }
    })();
  }

  return initializationPromise;
}

export default async function runApp(
  setup: (app: Express, server: Server) => Promise<void>,
) {
  const server = await ensureAppReady();

  // importantly run the final setup after setting up all the other routes so
  // the catch-all route doesn't interfere with the other routes
  await setup(app, server);

  // Prefer configured port, but in development automatically try the next ports
  // when the requested one is already occupied.
  const startPort = parseInt(process.env.PORT || "5000", 10);
  const maxRetries = app.get("env") === "development" ? 20 : 0;

  const listenOnPort = (port: number, retriesRemaining: number) => {
    const cleanup = () => {
      server.off("error", handleError);
      server.off("listening", handleListening);
    };

    const handleListening = () => {
      cleanup();
      log(`serving on port ${port}`);
    };

    const handleError = (error: NodeJS.ErrnoException) => {
      cleanup();

      if (error.code === "EADDRINUSE" && retriesRemaining > 0) {
        const nextPort = port + 1;
        log(`port ${port} is in use, retrying on ${nextPort}`);
        listenOnPort(nextPort, retriesRemaining - 1);
        return;
      }

      throw error;
    };

    server.once("error", handleError);
    server.once("listening", handleListening);
    server.listen({
      port,
      host: "0.0.0.0",
    });
  };

  listenOnPort(startPort, maxRetries);
}
