import { defineConfig } from "vite";
import path from "path";
import { glob } from "glob";
export default defineConfig({
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.html"),
        creator: path.resolve(__dirname, "src/creators/index.html"),
        fans: path.resolve(__dirname, "src/fans/index.html"),
      },
    },
  },
});
