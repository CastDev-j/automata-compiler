const tokenTable: Record<number, { token: number; word: string }> = {
  // Palabras reservadas
  3: { token: 1010, word: "break" },
  7: { token: 1020, word: "case" },
  11: { token: 1030, word: "class" },
  18: { token: 1040, word: "console" },
  23: { token: 1050, word: "const" },
  28: { token: 1060, word: "default" },
  34: { token: 1070, word: "do" },
  36: { token: 1080, word: "enum" },
  40: { token: 1090, word: "for" },
  43: { token: 1100, word: "if" },
  45: { token: 1110, word: "interface" },
  54: { token: 1120, word: "let" },
  57: { token: 1130, word: "log" },
  64: { token: 1140, word: "of" },
  66: { token: 1150, word: "push" },
  70: { token: 1160, word: "return" },
  78: { token: 1170, word: "switch" },
  84: { token: 1180, word: "type" },
  88: { token: 1190, word: "var" },
  93: { token: 1200, word: "while" },

  // Operadores
  100: { token: 2005, word: "=" },
  101: { token: 2010, word: "++" },
  102: { token: 2020, word: "--" },
  103: { token: 2030, word: "*" },
  104: { token: 2040, word: "/" },
  105: { token: 2050, word: "%" },
  106: { token: 2060, word: "+" },
  107: { token: 2070, word: "-" },
  108: { token: 2080, word: "<" },
  109: { token: 2090, word: "<=" },
  110: { token: 2100, word: ">=" },
  111: { token: 2110, word: ">" },
  112: { token: 2120, word: "==" },
  113: { token: 2130, word: "!=" },
  114: { token: 2140, word: "===" },
  115: { token: 2150, word: "!==" },
  116: { token: 2160, word: "!" },
  117: { token: 2170, word: "&&" },
  118: { token: 2180, word: "||" },
  119: { token: 2190, word: "&" },
  120: { token: 2200, word: "|" },

  // Puntuación
  121: { token: 3010, word: "." },
  122: { token: 3020, word: "," },
  123: { token: 3030, word: ";" },
  124: { token: 3040, word: ":" },

  // Llaves
  125: { token: 4010, word: "{" },
  126: { token: 4020, word: "}" },

  // Paréntesis y corchetes
  127: { token: 5010, word: "(" },
  128: { token: 5020, word: ")" },
  129: { token: 5030, word: "[" },
  130: { token: 5040, word: "]" },

  // Números y strings
  131: { token: 6000, word: "INT" },
  132: { token: 6010, word: "FLOAT" },
  133: { token: 7000, word: "STRING" },

  // Identificador
  200: { token: 8000, word: "ID" },
};

type TransitionMap = Record<string, number>;

// Cambiamos los corchetes [] por llaves {} para forzar el número de estado
const transitionTable: Record<number, TransitionMap> = {
  // FILA 0: DISPATCH INICIAL
  0: {
    a: 200, b: 1, c: 6, d: 21, e: 29, f: 33, g: 200, h: 200, i: 36, j: 200,
    k: 200, l: 46, m: 200, n: 200, ñ: 200, o: 51, p: 53, q: 200, r: 57, s: 63,
    t: 69, u: 200, v: 73, w: 76, x: 200, y: 200, z: 200,
    "0": 131, "1": 131, "2": 131, "3": 131, "4": 131, "5": 131, "6": 131,
    "7": 131, "8": 131, "9": 131, "+": 106, "-": 107, "*": 103, "/": 104,
    "%": 105, "<": 108, ">": 111, "=": 100, "!": 116, "&": 119, "|": 120,
    ".": 121, ",": 122, ";": 123, ":": 124, "{": 125, "}": 126, "(": 127,
    ")": 128, "[": 129, "]": 130, _: 200, '"': 133, " ": 0,
  },

  // ===== RUTA B =====
  1: { r: 2, _: 200 }, // b
  2: { e: 3, _: 200 }, // br
  3: { a: 4, _: 200 }, // bre
  4: { k: 5, _: 200 }, // brea
  5: { _: 200 },       // break (Fin)

  // ===== RUTAS C =====
  6: { a: 7, l: 10, o: 14, _: 200 }, // c
  7: { s: 8, _: 200 },               // ca
  8: { e: 9, _: 200 },               // cas
  9: { _: 200 },                     // case (Fin)
  10: { a: 11, _: 200 },             // cl
  11: { s: 12, _: 200 },             // cla
  12: { s: 13, _: 200 },             // clas
  13: { _: 200 },                    // class (Fin)
  14: { n: 15, _: 200 },             // co
  15: { s: 16, _: 200 },             // con
  16: { o: 17, t: 20, _: 200 },      // cons (Separa console y const)
  17: { l: 18, _: 200 },             // conso
  18: { e: 19, _: 200 },             // consol
  19: { _: 200 },                    // console (Fin)
  20: { _: 200 },                    // const (Fin)

  // ===== RUTAS D =====
  21: { e: 22, o: 28, _: 200 }, // d
  22: { f: 23, _: 200 },        // de
  23: { a: 24, _: 200 },        // def
  24: { u: 25, _: 200 },        // defa
  25: { l: 26, _: 200 },        // defau
  26: { t: 27, _: 200 },        // defaul
  27: { _: 200 },               // default (Fin)
  28: { _: 200 },               // do (Fin)

  // ===== RUTA E =====
  29: { n: 30, _: 200 }, // e
  30: { u: 31, _: 200 }, // en
  31: { m: 32, _: 200 }, // enu
  32: { _: 200 },        // enum (Fin)

  // ===== RUTA F =====
  33: { o: 34, _: 200 }, // f
  34: { r: 35, _: 200 }, // fo
  35: { _: 200 },        // for (Fin)

  // ===== RUTAS I =====
  36: { f: 37, n: 38, _: 200 }, // i
  37: { _: 200 },               // if (Fin)
  38: { t: 39, _: 200 },        // in
  39: { e: 40, _: 200 },        // int
  40: { r: 41, _: 200 },        // inte
  41: { f: 42, _: 200 },        // inter
  42: { a: 43, _: 200 },        // interf
  43: { c: 44, _: 200 },        // interfa
  44: { e: 45, _: 200 },        // interfac
  45: { _: 200 },               // interface (Fin)

  // ===== RUTAS L =====
  46: { e: 47, o: 49, _: 200 }, // l
  47: { t: 48, _: 200 },        // le
  48: { _: 200 },               // let (Fin)
  49: { g: 50, _: 200 },        // lo
  50: { _: 200 },               // log (Fin)

  // ===== RUTA O =====
  51: { f: 52, _: 200 }, // o
  52: { _: 200 },        // of (Fin)

  // ===== RUTA P =====
  53: { u: 54, _: 200 }, // p
  54: { s: 55, _: 200 }, // pu
  55: { h: 56, _: 200 }, // pus
  56: { _: 200 },        // push (Fin)

  // ===== RUTA R =====
  57: { e: 58, _: 200 }, // r
  58: { t: 59, _: 200 }, // re
  59: { u: 60, _: 200 }, // ret
  60: { r: 61, _: 200 }, // retu
  61: { n: 62, _: 200 }, // retur
  62: { _: 200 },        // return (Fin)

  // ===== RUTA S =====
  63: { w: 64, _: 200 }, // s
  64: { i: 65, _: 200 }, // sw
  65: { t: 66, _: 200 }, // swi
  66: { c: 67, _: 200 }, // swit
  67: { h: 68, _: 200 }, // switc
  68: { _: 200 },        // switch (Fin)

  // ===== RUTA T =====
  69: { y: 70, _: 200 }, // t
  70: { p: 71, _: 200 }, // ty
  71: { e: 72, _: 200 }, // typ
  72: { _: 200 },        // type (Fin)

  // ===== RUTA V =====
  73: { a: 74, _: 200 }, // v
  74: { r: 75, _: 200 }, // va
  75: { _: 200 },        // var (Fin)

  // ===== RUTA W =====
  76: { h: 77, _: 200 }, // w
  77: { i: 78, _: 200 }, // wh
  78: { l: 79, _: 200 }, // whi
  79: { e: 80, _: 200 }, // whil
  80: { _: 200 },        // while (Fin)

  // ===== OPERADORES, PUNTUACIÓN Y OTROS (Manteniendo tus números) =====
  100: { "=": 112 },
  101: {},
  102: {},
  103: {},
  104: {},
  105: {},
  106: { "+": 101 },
  107: { "-": 102 },
  108: { "=": 109 },
  109: {},
  110: {},
  111: { "=": 110 },
  112: { "=": 114 },
  113: { "=": 115 },
  114: {},
  115: {},
  116: { "=": 113 },
  117: {},
  118: {},
  119: { "&": 118 },
  120: { "|": 117 },
  121: { "0": 132, "1": 132, "2": 132, "3": 132, "4": 132, "5": 132, "6": 132, "7": 132, "8": 132, "9": 132 },
  122: {},
  123: {},
  124: {},
  125: {},
  126: {},
  127: {},
  128: {},
  129: {},
  130: {},
  131: { "0": 131, "1": 131, "2": 131, "3": 131, "4": 131, "5": 131, "6": 131, "7": 131, "8": 131, "9": 131, ".": 132 },
  132: { "0": 132, "1": 132, "2": 132, "3": 132, "4": 132, "5": 132, "6": 132, "7": 132, "8": 132, "9": 132 },
  133: { '"': 134 },
  134: {},
  200: { _: 200 },
};

type LexedToken = { token: number; word: string; value?: string; path?: string };
type TokenInfo = { token: number; word: string };

const tokenByCode: Record<number, TokenInfo> = {};
const reservedWords: Record<string, TokenInfo> = {};

for (const tokenInfo of Object.values(tokenTable)) {
  tokenByCode[tokenInfo.token] = tokenInfo;
  if (tokenInfo.token >= 1000 && tokenInfo.token < 2000) {
    reservedWords[tokenInfo.word] = tokenInfo;
  }
}

class Tokenizer {
  public exportTransitionTableToCSV(): string {
    // Definimos todos los símbolos que queremos como columnas
    const symbols = [
      ..."abcdefghijklmnñopqrstuvwxyz".split(""),
      ..."0123456789".split(""),
      "+", "-", "*", "/", "%", "<", ">", "=", "!", "&", "|",
      ".", ",", ";", ":", "{", "}", "(", ")", "[", "]", "_", '"', " "
    ];

    // Función auxiliar para nombrar columnas especiales y que no rompan el formato
    const getSymbolName = (s: string) => {
      if (s === " ") return "espacio";
      if (s === ",") return "coma";
      if (s === '"') return "comilla_doble";
      return s;
    };

    // Construimos la cabecera exacta de tu Excel
    const headers = [
      "estado",
      "tokenFinal",
      "categoria",
      "transicionesDefinidas",
      ...symbols.map(s => `simbolo:${getSymbolName(s)}`)
    ];

    let csvContent = headers.join(",") + "\n";

    // Generamos las filas para todos tus estados (0 al 134) y el 200
    const allStates = Array.from({ length: 135 }, (_, i) => i).concat([200]);

    for (const state of allStates) {
      // Obtenemos información del token para esta fila
      const tokenInfo = state === 0 ? null : this.getTokenForState(state, "dummy");
      const isFinal = tokenInfo !== null;
      const tokenFinal = isFinal ? tokenInfo.word : "";
      const categoria = this.getCategoryName(tokenInfo?.token ?? null, state);

      const currentTransitions = transitionTable[state] ?? {};
      
      // Contamos las transiciones definidas (ignorando el fallback '_')
      const explicitTransitions = Object.keys(currentTransitions).filter(k => k !== "_").length;

      const row = [
        state.toString(),
        tokenFinal,
        categoria,
        explicitTransitions.toString()
      ];

      // Simulamos qué pasaría con cada símbolo
      for (const char of symbols) {
        let nextRow = currentTransitions[char];
        
        if (nextRow === undefined) {
          nextRow = this.getVirtualNextState(state, char);
          if (nextRow === undefined) {
            nextRow = currentTransitions["_"]; // Fallback (como ir al 200)
          }
        }

        // Si hay estado de destino lo ponemos, si no, dejamos la celda en blanco
        row.push(nextRow !== undefined ? nextRow.toString() : "");
      }

      csvContent += row.join(",") + "\n";
    }

    return csvContent;
  }
  private getVirtualNextState(
    currentRow: number,
    char: string,
  ): number | undefined {
    if (currentRow === 106 && char === "+") return 101;
    if (currentRow === 107 && char === "-") return 102;
    if (currentRow === 108 && char === "=") return 109;
    if (currentRow === 111 && char === "=") return 110;
    if (currentRow === 100 && char === "=") return 112;
    if (currentRow === 112 && char === "=") return 114;
    if (currentRow === 116 && char === "=") return 113;
    if (currentRow === 113 && char === "=") return 115;
    if (currentRow === 119 && char === "&") return 118;
    if (currentRow === 120 && char === "|") return 117;

    if (currentRow === 121 && this.isDigit(char)) return 132;
    if (currentRow === 131 && this.isDigit(char)) return 131;
    if (currentRow === 131 && char === ".") return 132;
    if (currentRow === 132 && this.isDigit(char)) return 132;

    if (currentRow === 133) return char === '"' ? 134 : 133;
    if (currentRow === 200) {
      if (this.isLetter(char) || this.isDigit(char) || char === "_") {
        return 200;
      }
    }

    return undefined;
  }

  private isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  private isLetter(char: string): boolean {
    return (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      char === "ñ" ||
      char === "Ñ"
    );
  }

  private isSpace(char: string): boolean {
    return char === " " || char === "\t" || char === "\n" || char === "\r";
  }

  private getTokenForState(state: number, lexeme: string): TokenInfo | null {
    const stateToToken: Record<number, number> = {
      // Palabras Reservadas (Nuevos estados)
      5: 1010,   // break
      9: 1020,   // case
      13: 1030,  // class
      19: 1040,  // console
      20: 1050,  // const
      27: 1060,  // default
      28: 1070,  // do
      32: 1080,  // enum
      35: 1090,  // for
      37: 1100,  // if
      45: 1110,  // interface
      48: 1120,  // let
      50: 1130,  // log
      52: 1140,  // of
      56: 1150,  // push
      62: 1160,  // return
      68: 1170,  // switch
      72: 1180,  // type
      75: 1190,  // var
      80: 1200,  // while

      // Operadores y símbolos (Tus estados originales intactos)
      100: 2005, 101: 2010, 102: 2020, 103: 2030, 104: 2040, 105: 2050,
      106: 2060, 107: 2070, 108: 2080, 109: 2090, 110: 2100, 111: 2110,
      112: 2120, 113: 2130, 114: 2140, 115: 2150, 116: 2160, 117: 2180,
      118: 2170, 119: 2190, 120: 2200, 121: 3010, 122: 3020, 123: 3030,
      124: 3040, 125: 4010, 126: 4020, 127: 5010, 128: 5020, 129: 5030,
      130: 5040, 131: 6000, 132: 6010, 134: 7000, 200: 8000,
    };

    const tokenCode = stateToToken[state];
    if (!tokenCode) {
      return null;
    }

    const tokenInfo = tokenByCode[tokenCode];
    return tokenInfo ? tokenInfo : null;
  }
  

  // Helper para asignar la categoría correcta según el número de token
  private getCategoryName(tokenCode: number | null, state: number): string {
    if (state === 0) return "No final";
    if (!tokenCode) return "No final";
    if (tokenCode >= 1000 && tokenCode < 2000) return "Reservada";
    if (tokenCode >= 2000 && tokenCode < 3000) return "Operador";
    if (tokenCode >= 3000 && tokenCode < 4000) return "Puntuacion";
    if (tokenCode >= 4000 && tokenCode < 5000) return "Llave";
    if (tokenCode >= 5000 && tokenCode < 6000) return "Parentesis/Corchete";
    if (tokenCode >= 6000 && tokenCode < 7000) return "Numero";
    if (tokenCode === 7000) return "String";
    if (tokenCode === 8000) return "Identificador";
    return "No final";
  }

  public lexer(input: string): LexedToken[] {
    const tokens: LexedToken[] = [];
    let i = 0;
    const n = input.length;

    while (i < n) {
      // Omitir espacios en blanco
      while (i < n) {
        const current = input[i];
        if (current === undefined || !this.isSpace(current)) {
          break;
        }
        i++;
      }

      if (i >= n) break;

      let currentRow = 0;
      let lexeme = "";
      let lastValidState = -1;
      let lastValidLexeme = "";
      let lastValidIndex = i;
      
      // Iniciamos la ruta siempre en el estado 0
      let currentPath = "0"; 
      let lastValidPath = "";

      while (i < n) {
        const char = input[i];
        if (char === undefined) {
          break;
        }

        if (currentRow !== 133 && this.isSpace(char)) {
          if (lastValidState >= 0) {
            const tokenInfo = this.getTokenForState(
              lastValidState,
              lastValidLexeme,
            );
            if (tokenInfo) {
              tokens.push({
                token: tokenInfo.token,
                word: tokenInfo.word,
                value: lastValidLexeme,
                path: lastValidPath, 
              });
            }
          }
          i++;
          break;
        }

        const currentTransitions = transitionTable[currentRow] ?? {};

        let nextRow = currentTransitions[char];

        if (nextRow === undefined) {
          nextRow = this.getVirtualNextState(currentRow, char);

          if (nextRow === undefined) {
            nextRow = currentTransitions["_"] ?? 0;
          }
        }

        if (nextRow === 0 || nextRow === undefined) {
          if (lastValidState >= 0) {
            const tokenInfo = this.getTokenForState(
              lastValidState,
              lastValidLexeme,
            );
            if (tokenInfo) {
              tokens.push({
                token: tokenInfo.token,
                word: tokenInfo.word,
                value: lastValidLexeme,
                path: lastValidPath,
              });
              i = lastValidIndex;
              break;
            }
          }
          break;
        }

        currentRow = nextRow;
        lexeme += char;
        
        // Damos formato a caracteres especiales para que no rompan la consola
        const displayChar = char === "\n" ? "\\n" : char === "\r" ? "\\r" : char === "\t" ? "\\t" : char;
        
        // Concatenamos el caracter leído y el estado de destino
        currentPath += ` -[${displayChar}]-> ${currentRow}`;

        const tokenInfo = this.getTokenForState(currentRow, lexeme);
        if (tokenInfo) {
          lastValidState = currentRow;
          lastValidLexeme = lexeme;
          lastValidIndex = i + 1;
          lastValidPath = currentPath; // Guardamos el texto de la ruta hasta aquí
        }

        i++;
      }

      if (i >= n && lastValidState >= 0) {
        const tokenInfo = this.getTokenForState(
          lastValidState,
          lastValidLexeme,
        );
        if (tokenInfo) {
          tokens.push({
            token: tokenInfo.token,
            word: tokenInfo.word,
            value: lastValidLexeme,
            path: lastValidPath,
          });
        }
      }
    }

    return tokens;
  }
}

const tokenizer = new Tokenizer();

function lexer(input: string): LexedToken[] {
  return tokenizer.lexer(input);
}

export { Tokenizer, lexer };
