export const tokenTable: Record<number, { token: number; word: string } | { token: number; word: string }[]> = {
  // Palabras reservadas
  5: { token: 1010, word: "break" },
  9: { token: 1020, word: "case" },
  13: { token: 1030, word: "class" },
  19: { token: 1040, word: "console" },
  20: { token: 1050, word: "const" },
  27: { token: 1060, word: "default" },
  28: { token: 1070, word: "do" },
  32: { token: 1080, word: "enum" },
  35: { token: 1090, word: "for" },
  37: { token: 1100, word: "if" },
  45: { token: 1110, word: "interface" },
  48: { token: 1120, word: "let" },
  50: { token: 1130, word: "log" },
  52: { token: 1140, word: "of" },
  56: { token: 1150, word: "push" },
  62: { token: 1160, word: "return" },
  68: { token: 1170, word: "switch" },
  72: { token: 1180, word: "type" },
  75: { token: 1190, word: "var" },
  80: { token: 1200, word: "while" },

  // Operadores
  1000: { token: 2005, word: "=" },
  101: { token: 2010, word: "++" },
  102: { token: 2020, word: "--" },
  103: { token: 2030, word: "*" },
  104: { token: 2040, word: "/" },
  105: { token: 2050, word: "%" },
  1060: { token: 2060, word: "+" },
  1070: { token: 2070, word: "-" },
  1080: { token: 2080, word: "<" },
  109: { token: 2090, word: "<=" },
  110: { token: 2100, word: ">=" },
  1110: { token: 2110, word: ">" },
  1120: { token: 2120, word: "==" },
  1130: { token: 2130, word: "!=" },
  114: { token: 2140, word: "===" },
  115: { token: 2150, word: "!==" },
  1160: { token: 2160, word: "!" },
  117: { token: 2170, word: "||" },
  118: { token: 2180, word: "&&" },
  1190: { token: 2190, word: "&" },
  1200: { token: 2200, word: "|" },

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

  // Identificador
  2000: { token: 8000, word: "ID" },
  20001: [ { token: 8000, word: "ID" }, { token: 3020, word: "," }],
  20002: [ { token: 8000, word: "ID" }, { token: 3030, word: ";" }],
  20003: [ { token: 8000, word: "ID" }, { token: 2005, word: "=" }],
  1310: { token: 6000, word: "INT" },
  13101: [{ token: 6000, word: "INT" }, { token: 3030, word: ";" }],
  13102: [{ token: 6000, word: "INT" }, { token: 3030, word: "+" }],
  13103: [{ token: 6000, word: "INT" }, { token: 3030, word: "-" }],
  13104: [{ token: 6000, word: "INT" }, { token: 3030, word: "*" }],
  13105: [{ token: 6000, word: "INT" }, { token: 3030, word: "/" }],
  1320: { token: 6010, word: "FLOAT" },
  134: { token: 7000, word: "STRING" },

  // Error
  201: { token: 9000, word: "ERROR" },
};