import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  esbuild: {
    target: "esnext",
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },

  },
  build: {
    target: 'esnext',
    minify: 'esbuild',

  },
  plugins: [topLevelAwait()],
});
