import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/my-world-atlas/", // Replace 'my-world-atlas' with your GitHub Repo name
});
