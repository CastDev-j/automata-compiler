import type { State } from "@/interface";
import { tokenTable } from "./tokenTable";
import { transitionTable } from "./transitionTable";

class Tokenizer {
  private idCounter = 8001;
  private intCounter = 6001;
  private floatCounter = 6011;
  private idMap = new Map<string, number>();
  private intMap = new Map<string, number>();
  private floatMap = new Map<string, number>();

  public lexer(input: string) {
    let rowNumber = 1;
    let currentState = 0;
    const tokens = [];
    let i = 0;
    const n = input.length;
    let lexeme = "";

    while (i < n) {
      const char = input[i];

      if (char == "\r") {
        rowNumber++;
      }

      const newState = transitionTable[currentState]![char as keyof State];

      if (newState === 201 || newState === 202 || newState === undefined) {
        const errorMessage =
          (tokenTable[newState!] as { word: string })!.word ||
          "Error desconocido";
        const errorCode = newState ?? "No identificado";

        throw new Error(
          `Error léxico en la fila ${rowNumber}: ${errorMessage} (código: ${errorCode})`,
        );
      }

      lexeme += ![" ", "\t", "\n", "\r"].includes(char!) ? char : "";

      if (tokenTable[newState]) {
        const tokenEntries = Array.isArray(tokenTable[newState])
          ? tokenTable[newState]
          : [tokenTable[newState]];
        const isCombined = Array.isArray(tokenTable[newState]);
        const mappedEntries = tokenEntries.map((entry) => {
          if (entry.word === "ID") {
            const name = isCombined ? lexeme.slice(0, -1) : lexeme;
            if (!this.idMap.has(name)) {
              this.idMap.set(name, this.idCounter++);
            }
            return { ...entry, token: this.idMap.get(name)! };
          }
          if (entry.word === "INT") {
            const value = isCombined ? lexeme.slice(0, -1) : lexeme;
            if (!this.intMap.has(value)) {
              this.intMap.set(value, this.intCounter++);
            }
            return { ...entry, token: this.intMap.get(value)! };
          }
          if (entry.word === "FLOAT") {
            const value = isCombined ? lexeme.slice(0, -1) : lexeme;
            if (!this.floatMap.has(value)) {
              this.floatMap.set(value, this.floatCounter++);
            }
            return { ...entry, token: this.floatMap.get(value)! };
          }
          return entry;
        });
        tokens.push({
          token: mappedEntries.map((entry) => entry.token),
          word: mappedEntries.map((entry) => entry.word),
          value: lexeme,
        });
        currentState = 0;
        lexeme = "";
      } else {
        currentState = newState;
      }

      i++;
    }
    return tokens;
  }
}

const lexer = (input: string) => {
  const tokenizer = new Tokenizer();

  try {
    return tokenizer.lexer(input);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    console.error(errorMessage);
  }
};

export { lexer };
