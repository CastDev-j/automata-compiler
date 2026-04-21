import { expect, test } from "bun:test";

import { lexer } from "@compiler/tokenizer";
import { demoPath, outputPath, runFromDemoFile } from "@/index";

test("integration: archivo demo genera output.txt", async () => {
  const source = await Bun.file(demoPath).text();
  const tokenCodes = lexer(source).map((token) => token.token);
  const expectedOutput = tokenCodes.join(" ");

  const writtenOutput = await runFromDemoFile();
  const outputFromFile = (await Bun.file(outputPath).text()).trim();

  expect(writtenOutput).toBe(expectedOutput);
  expect(outputFromFile).toBe(expectedOutput);
});

test("integration: cobertura de lenguaje completo", () => {
  const source = [
    "break case class const console default do enum for if interface let log of push return switch type var while",
    "id _tmp item1 item_2 whilees",
    "0 1 2 3 4 5 6 7 8 9 10 25 300 42.5 3.1416",
    "+ - * / % < <= > >= = == === ! != !== & && | || ++ --",
    ". , ; : { } ( ) [ ]",
    '"string simple"',
    '"string con espacios y 123"',
  ].join("\n");

  const tokens = lexer(source);
  const issues: string[] = [];

  const reservedWords = new Map<string, number>([
    ["break", 1010],
    ["case", 1020],
    ["class", 1030],
    ["const", 1050],
    ["console", 1040],
    ["default", 1060],
    ["do", 1070],
    ["enum", 1080],
    ["for", 1090],
    ["if", 1100],
    ["interface", 1110],
    ["let", 1120],
    ["log", 1130],
    ["of", 1140],
    ["push", 1150],
    ["return", 1160],
    ["switch", 1170],
    ["type", 1180],
    ["var", 1190],
    ["while", 1200],
  ]);

  const operatorTokens = new Map<string, number>([
    ["+", 2060],
    ["-", 2070],
    ["*", 2030],
    ["/", 2040],
    ["%", 2050],
    ["<", 2080],
    ["<=", 2090],
    [">", 2110],
    [">=", 2100],
    ["=", 2005],
    ["==", 2120],
    ["===", 2140],
    ["!", 2160],
    ["!=", 2130],
    ["!==", 2150],
    ["&&", 2170],
    ["||", 2180],
    ["++", 2010],
    ["--", 2020],
  ]);

  const punctuationTokens = new Map<string, number>([
    [".", 3010],
    [",", 3020],
    [";", 3030],
    [":", 3040],
    ["{", 4010],
    ["}", 4020],
    ["(", 5010],
    [")", 5020],
    ["[", 5030],
    ["]", 5040],
  ]);

  for (const [word, tokenCode] of reservedWords) {
    const token = tokens.find((t) => t.value === word);
    if (!token) {
      issues.push(`Reservada no encontrada: ${word}`);
      continue;
    }
    if (token.token !== tokenCode) {
      issues.push(
        `Reservada mal clasificada: ${word} -> ${token.token}, esperado ${tokenCode}`,
      );
    }
  }

  const expectedIds = ["id", "_tmp", "item1", "item_2", "whilees"];
  for (const id of expectedIds) {
    const token = tokens.find((t) => t.value === id);
    if (!token) {
      issues.push(`ID no encontrado: ${id}`);
      continue;
    }
    if (token.token !== 8000) {
      issues.push(`ID mal clasificado: ${id} -> ${token.token}, esperado 8000`);
    }
  }

  const expectedInts = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "25",
    "300",
  ];
  for (const n of expectedInts) {
    const token = tokens.find((t) => t.value === n);
    if (!token) {
      issues.push(`INT no encontrado: ${n}`);
      continue;
    }
    if (token.token !== 6000) {
      issues.push(`INT mal clasificado: ${n} -> ${token.token}, esperado 6000`);
    }
  }

  const expectedFloats = ["42.5", "3.1416"];
  for (const n of expectedFloats) {
    const token = tokens.find((t) => t.value === n);
    if (!token) {
      issues.push(`FLOAT no encontrado: ${n}`);
      continue;
    }
    if (token.token !== 6010) {
      issues.push(
        `FLOAT mal clasificado: ${n} -> ${token.token}, esperado 6010`,
      );
    }
  }

  for (const [op, tokenCode] of operatorTokens) {
    const token = tokens.find((t) => t.value === op);
    if (!token) {
      issues.push(`Operador no encontrado: ${op}`);
      continue;
    }
    if (token.token !== tokenCode) {
      issues.push(
        `Operador mal clasificado: ${op} -> ${token.token}, esperado ${tokenCode}`,
      );
    }
  }

  for (const [p, tokenCode] of punctuationTokens) {
    const token = tokens.find((t) => t.value === p);
    if (!token) {
      issues.push(`Puntuación no encontrada: ${p}`);
      continue;
    }
    if (token.token !== tokenCode) {
      issues.push(
        `Puntuación mal clasificada: ${p} -> ${token.token}, esperado ${tokenCode}`,
      );
    }
  }

  const stringLiterals = ['"string simple"', '"string con espacios y 123"'];
  for (const s of stringLiterals) {
    const token = tokens.find((t) => t.value === s);
    if (!token) {
      issues.push(`STRING no encontrado: ${s}`);
      continue;
    }
    if (token.token !== 7000) {
      issues.push(
        `STRING mal clasificado: ${s} -> ${token.token}, esperado 7000`,
      );
    }
  }

  expect(issues).toEqual([]);
});
