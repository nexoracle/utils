import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["lib/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".mjs" : ".cjs",
      };
    },
  },
  {
    entry: ["lib/browser/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist/browser",
    clean: false,
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".mjs" : ".cjs",
      };
    },
  },
  {
    entry: ["lib/browser/index.ts"],
    format: ["iife"],
    globalName: "utils",
    outDir: "dist/browser",
    clean: false,
    minify: true,
  },
]);
