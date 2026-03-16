import { defineConfig } from "vite";
import path from "path";
import checker from "vite-plugin-checker";
import fg from "fast-glob";

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
  plugins: [
    checker({
      eslint: {
        useFlatConfig: true,
        lintCommand: "eslint . --ext .js,.ts,.mjs,.cjs",
      },
      stylelint: {
        lintCommand: 'stylelint "{src,components}/**/*.css" --allow-empty-input --formatter string',
      },
    }),
  ],
  base: "./",
  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: fg.sync([
        "src/styles/**/*.css",
        "!src/styles/**/_*.css",
        "src/scripts/**/*.ts",
        "components/**/*.css",
        "components/**/*.ts",
      ]),
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "chunk/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          // Place all font files in assets/fonts/
          if (assetInfo.name && /\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "css/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    origin,
    cors: {
      origin: process.env.DDEV_PRIMARY_URL,
    },

    hmr: {
      host: process.env.DDEV_PRIMARY_URL
        ? new URL(process.env.DDEV_PRIMARY_URL).hostname
        : "localhost",
    },

    watch: {
      ignored: ["!**/*.twig"],
    },
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@scripts": path.resolve(__dirname, "src/scripts"),
      "@components": path.resolve(__dirname, "components"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
    },
  },
});
