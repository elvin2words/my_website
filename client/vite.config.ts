import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    // Commenting this because it's ESM-only and breaks build
    // runtimeErrorOverlay(),
  ],
  // base: '/', // or '' if you run into issues
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      // Optional: if you ensure these folders exist within client/ or via workspaces
      // "@shared": path.resolve(__dirname, "../shared"),
      // "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    // outDir: path.resolve(__dirname, "../dist/public"),
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
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
        },
      },
    },
  },
  server: {
    host: true,
  },
});
