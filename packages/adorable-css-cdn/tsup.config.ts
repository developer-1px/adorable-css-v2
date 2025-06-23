import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife", "esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: true,
  target: "es2020",
  outDir: "dist",
  globalName: "AdorableCSSV2",
  noExternal: ["adorable-css"],
});
