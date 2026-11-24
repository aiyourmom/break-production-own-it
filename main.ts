import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY: string = "I pushed the fix without running the tests — the tests were slow. The outage is fast.";

// Count code points, not UTF-16 units, so multi-byte characters (em dash)
// are measured the way the gate counts them.
const entryLength: number = [...ENTRY].length;
if (entryLength < 1 || entryLength > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entryLength}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to /output/entry.txt`);
