import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite's dev server sends any URL without a file extension through the SPA
// history-fallback to the root index.html. That breaks `/admin/`, which is a
// real static page (public/admin/index.html), not an SPA route. This dev-only
// plugin rewrites `/admin` and `/admin/` to `/admin/index.html` BEFORE the
// fallback kicks in, so dev matches the GitHub Pages production behavior
// (where directory index resolution happens for free).
const adminStaticPlugin = {
  name: "admin-static-route",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/admin" || req.url === "/admin/") {
        req.url = "/admin/index.html";
      }
      next();
    });
  },
};

// Custom domain (CNAME) -> base is root.
export default defineConfig({
  base: "/",
  plugins: [react(), adminStaticPlugin],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
});
