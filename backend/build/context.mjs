import esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

export function resolve(p) {
  return path.resolve(fileURLToPath(path.dirname(import.meta.url)), p);
}

export const context = await esbuild.context({
  entryPoints: [resolve("../src/index.ts")],
  outdir: resolve("../dist"),
  bundle: true,
  platform: "node",
});
