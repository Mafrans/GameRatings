import { build } from "./build.mjs";

const ctx = await build();
ctx.watch();
