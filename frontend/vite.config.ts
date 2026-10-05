import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen inside the container; Compose publishes it on localhost only
    port: 3000,
    strictPort: true,
    // File events from bind mounts are unreliable on Docker Desktop (macOS), so poll.
    watch: { usePolling: true },
  },
});
