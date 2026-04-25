import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (CNAME) -> base is root.
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
});
