/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";

import path from "path";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), viteCompression()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5050,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    // build: {
    //   sourcemap: true,
    // },
  };
});
