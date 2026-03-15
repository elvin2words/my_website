import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function manualChunks(id: string) {
  if (!id.includes("node_modules")) return;
  if (
    id.includes("/react/") ||
    id.includes("/react-dom/") ||
    id.includes("/scheduler/") ||
    id.includes("/wouter/")
  ) {
    return "vendor-react";
  }
  if (id.includes("/@radix-ui/")) return "vendor-radix";
  if (
    id.includes("/framer-motion/") ||
    id.includes("/lucide-react/") ||
    id.includes("/aos/")
  ) {
    return "vendor-motion";
  }
  if (id.includes("/recharts/")) return "vendor-charts";
  if (id.includes("/@tanstack/")) return "vendor-query";
  return "vendor";
}

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-runtime-error-modal").then((m) =>
            m.default(),
          ),
          // @ts-ignore - optional Replit-only plugin, not in package.json outside Replit
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
  optimizeDeps: {
    entries: ["index.html"],
  },
  server: {
    host: true, // Bind to 0.0.0.0 for external access
    // allowedHosts: ["3e11-102-213-42-248.ngrok-free.app"], // Allow ngrok host
  },
});
