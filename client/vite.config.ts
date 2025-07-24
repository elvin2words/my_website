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
      "@": path.resolve(__dirname, "src"),
      // Optional: if you ensure these folders exist within client/ or via workspaces
      // "@shared": path.resolve(__dirname, "../shared"),
      // "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    // outDir: path.resolve(__dirname, "../dist/public"),
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
});
