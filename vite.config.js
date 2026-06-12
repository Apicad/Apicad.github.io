import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Writes an interactive bundle-size breakdown to bundle-stats.html on every build
    visualizer({ filename: "bundle-stats.html", gzipSize: true }),
  ],
  assetsInclude: ["**/*.glb"],
  base: "/portfolio-website/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "three-stdlib",
          ],
          spline: ["@splinetool/react-spline"],
          animation: ["framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      "@splinetool/react-spline",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
});
