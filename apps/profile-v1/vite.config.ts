import react from '@vitejs/plugin-react';
// import { glob } from "glob";
// import { fileURLToPath } from "node:url";
// import path, { extname, relative, resolve } from "path";
import path from "path";
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ["cordova-build/www"] })],
  build: {
    outDir: "release/www",
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src", "components"),
      "@/containers": path.resolve(__dirname, "src", "containers"),
      "@/assets": path.resolve(__dirname, "src", "assets"),
      "@/hooks": path.resolve(__dirname, "src", "hooks"),
      "@/appRoute": path.resolve(__dirname, "src", "appRoute"),
      "@/utils": path.resolve(__dirname, "src", "utils"),
      "@/context": path.resolve(__dirname, "src", "context"),
    }
  }
})
