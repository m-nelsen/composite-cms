import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Changes to HTML paths here must be reflected in './server.js' getHTMLPageType()
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "src/page_types/admin/index.html"),
        homepage: resolve(__dirname, "src/page_types/homepage/index.html"),
      },
    },
  },
  clearScreen: false,
  plugins: [react()],
});
