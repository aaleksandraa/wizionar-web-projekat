import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Keep the bundle friendly to older Safari versions that still have native modules.
    target: ["es2018", "safari12"],
    cssTarget: "safari12",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("/react/") ||
            id.includes("\\react\\") ||
            id.includes("scheduler")
          ) {
            return "framework";
          }

          if (
            id.includes("framer-motion") ||
            id.includes("motion-dom") ||
            id.includes("embla-carousel")
          ) {
            return "motion";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("lucide-react") ||
            id.includes("cmdk") ||
            id.includes("sonner") ||
            id.includes("vaul")
          ) {
            return "ui";
          }

          return "vendor";
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
