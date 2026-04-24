import type { State } from "@/interface";
import { tokenTable } from "./tokenTable";
import { transitionTable } from "./transitionTable";

class Tokenizer {
  public lexer(input: string) {
    let rowNumber = 1;
    let currentState = 0;
    const tokens = [];
    let i = 0;
    const n = input.length;
    let lexeme = "";

    while (i < n) {
      const char = input[i];

      if ( char == "\r") {
        rowNumber++;
      };

      const newState = transitionTable[currentState]![char as keyof State]
      
      if (newState === 201 || newState === undefined) {       
        throw new Error(`Error léxico en la fila ${rowNumber}`);
      }

      lexeme += ![" ", "\t", "\n", "\r"].includes(char!) ? char : "";

      if (tokenTable[newState] ) {
        const tokenEntries = Array.isArray(tokenTable[newState]) ? tokenTable[newState] : [tokenTable[newState]];
        tokens.push({
          token: tokenEntries.map(entry => entry.token),
          word: tokenEntries.map(entry => entry.word),
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
