import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Gerçek API sunucunuzun adresi
        changeOrigin: true, // Host başlığını hedefin host başlığı olarak değiştirir
      },
      "/message": {
        target: "http://localhost:8080", // Gerçek API sunucunuzun adresi
        changeOrigin: true, // Host başlığını hedefin host başlığı olarak değiştirir
      },
      "/add": {
        target: "http://localhost:8080", // Gerçek API sunucunuzun adresi
        changeOrigin: true, // Host başlığını hedefin host başlığı olarak değiştirir
      },
      "/get-products": {
        target: "http://localhost:8080", // Gerçek API sunucunuzun adresi
        changeOrigin: true, // Host başlığını hedefin host başlığı olarak değiştirir
      },
    },
  },
});
