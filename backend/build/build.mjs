import { context } from "./context.mjs";

// Dispose after one build
await context.rebuild();
context.dispose();
