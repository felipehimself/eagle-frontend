import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`Vite running in ${mode} mode`);

  return {
    server: {
      host: "127.0.0.1",
      port: 5173,
      strictPort: true,
    },
    envPrefix: "CLIENT_",
    plugins: [react(), tsconfigPaths()],
  };
});
