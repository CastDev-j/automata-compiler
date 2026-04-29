import { join } from "node:path";
import { lexer } from "@compiler/tokenizer";
import { formatDocument } from "./interface";

const demoPath = join(import.meta.dir, "examples", "demo.cat");
const outputPath = join(import.meta.dir, "examples", "output.txt");

async function runFromDemoFile() {
  const source = await Bun.file(demoPath).text();
  const tokens = lexer(formatDocument(source));

  if (!tokens) return;

  console.log(source);
  console.log(tokens.map(t=>t.token).flat().join(" "));
  
  
  console.log(tokens);

  await Bun.write(outputPath, tokens.map(t=>t.token).flat().join(" "));

  return tokens;
}

if (import.meta.main) {
  await runFromDemoFile();
}

export { runFromDemoFile, demoPath, outputPath };
