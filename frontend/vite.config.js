import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      include: ["**/*.jsx", "**/*.js"],
    }),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
  },
  esbuild: {
    loader: "jsx",
    include: /\.(js|jsx)$/,
  },
});
