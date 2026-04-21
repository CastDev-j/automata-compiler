import { expect, test } from "bun:test";

import { lexer } from "@compiler/tokenizer";
import { demoPath, outputPath, runFromDemoFile } from "@/index";

test("integration test", async () => {
  const source = await Bun.file(demoPath).text();
  const tokenCodes = lexer(source).map((token) => token.token);
  const expectedOutput = tokenCodes.join(" ");

  expect(tokenCodes.join(" ")).toBe(expectedOutput);

  const writtenOutput = await runFromDemoFile();
  const outputFromFile = (await Bun.file(outputPath).text()).trim();

  expect(writtenOutput).toBe(expectedOutput);
  expect(outputFromFile).toBe(expectedOutput);
});
