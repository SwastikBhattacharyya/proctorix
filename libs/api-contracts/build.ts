import { globSync } from "node:fs";
import { dts } from "@anymud/bun-plugin-dts";
import { build } from "bun";

await build({
  entrypoints: globSync("./src/index.ts"),
  root: "./src",
  outdir: "./dist",
  target: "node",
  packages: "external",
  minify: {
    identifiers: false,
    keepNames: false,
    syntax: true,
    whitespace: true,
  },
  plugins: [dts()],
});
