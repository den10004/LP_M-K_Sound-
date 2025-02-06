import { defineConfig } from "vite";

export default defineConfig({
  base: "",
  assetsInclude: ["**/*.ico"],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "./index.html",
        MPS1620P: "./MPS1620P.html",
        MPS2520P: "./MPS2520P.html",
        thanks: "./thanks.html",
        privacy: "./privacy.html",
      },
    },
  },
});
