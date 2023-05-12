import { context } from "./context.mjs";

// Rebuild once, then watch for future changes
await context.rebuild();
context.watch();
