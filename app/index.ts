import { join } from "node:path";

import { lexer } from "@compiler/tokenizer";

const demoPath = join(import.meta.dir, "examples", "demo.cat");
const outputPath = join(import.meta.dir, "examples", "output.txt");

async function runFromDemoFile() {
  const source = await Bun.file(demoPath).text();
  const tokens = lexer(source);
  const output = tokens.map((token) => token.token).join(" ");

  await Bun.write(outputPath, output);
  console.log("Tokens:");
  tokens.forEach((token, index) => {
    console.log(`#${index + 1}`, token);
  });
  console.log("Token codes:", output);

  return output;
}

if (import.meta.main) {
  await runFromDemoFile();
}

export { runFromDemoFile, demoPath, outputPath };
