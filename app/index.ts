import { join } from "node:path";
import { Tokenizer } from "./compiler/tokenizer.ts";
import { lexer } from "@compiler/tokenizer";

const demoPath = join(import.meta.dir, "examples", "demo.cat");
const outputPath = join(import.meta.dir, "examples", "output.txt");

async function runFromDemoFile() {
  const source = await Bun.file(demoPath).text();
  const tokens = lexer(source);
  const output = tokens.map((token) => token.token).join(" ");

  await Bun.write(outputPath, output);
  
  // 👇 ¡ESTA ES LA LÍNEA QUE FALTABA! 👇
  // Creamos la instancia de tu clase para poder acceder a sus métodos
  const tokenizer = new Tokenizer(); 

  // NUEVO: Generar el archivo Excel (CSV)
  const csvData = tokenizer.exportTransitionTableToCSV();
  const excelPath = join(import.meta.dir, "examples", "tabla_automata.csv");
  await Bun.write(excelPath, csvData);
  console.log(`\n📊 Excel de la tabla generado exitosamente en: ${excelPath}\n`);

  console.log("Tokens analizados con sus rutas:");
  tokens.forEach((token, index) => {
    const rutaTxt = token.path ? token.path : "Sin ruta";
    console.log(
      `#${index + 1} [${token.value}]`,
      `\n   ├─ Ruta:   ${rutaTxt}`,
      `\n   └─ Token:  ${token.token} (${token.word})\n`
    );
  });

  return output;
}

if (import.meta.main) {
  await runFromDemoFile();
}

export { runFromDemoFile, demoPath, outputPath };
