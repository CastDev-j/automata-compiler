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

const transitionTable: TransitionMap[] = [
  // FILA 0: DISPATCH INICIAL
  {
    a: 200,
    b: 1,
    c: 2,
    d: 8,
    e: 12,
    f: 15,
    g: 200,
    h: 200,
    i: 19,
    j: 200,
    k: 200,
    l: 22,
    m: 200,
    n: 200,
    ñ: 200,
    o: 29,
    p: 30,
    q: 200,
    r: 35,
    s: 37,
    t: 38,
    u: 200,
    v: 42,
    w: 44,
    x: 200,
    y: 200,
    z: 200,
    "0": 131,
    "1": 131,
    "2": 131,
    "3": 131,
    "4": 131,
    "5": 131,
    "6": 131,
    "7": 131,
    "8": 131,
    "9": 131,
    "+": 106,
    "-": 107,
    "*": 103,
    "/": 104,
    "%": 105,
    "<": 108,
    ">": 111,
    "=": 100,
    "!": 116,
    "&": 119,
    "|": 120,
    ".": 121,
    ",": 122,
    ";": 123,
    ":": 124,
    "{": 125,
    "}": 126,
    "(": 127,
    ")": 128,
    "[": 129,
    "]": 130,
    _: 200,
    '"': 133,
    " ": 0,
  },

  // b (1)
  { r: 3, _: 200 },

  // c (2)
  { a: 3, l: 4, o: 5, _: 200 },

  // ca (3)
  { s: 6, _: 200 },

  // cl (4)
  { a: 9, _: 200 },

  // co (5)
  { n: 10, _: 200 },

  // cas (6)
  { e: 7, _: 200 },

  // case (7)
  { _: 200 },

  // d (8)
  { e: 26, o: 77, _: 200 },

  // cla (9)
  { s: 11, _: 200 },

  // con (10)
  { s: 23, _: 200 },

  // clas (11)
  { s: 11, _: 200 },

  // e (12)
  { n: 13, _: 200 },

  // en (13)
  { u: 14, _: 200 },

  // enu (14)
  { m: 36, _: 200 },

  // f (15)
  { o: 39, _: 200 },

  // i (19)
  { f: 92, n: 46, _: 200 },

  // l (22)
  { e: 55, o: 58, _: 200 },

  // cons (23)
  { t: 24, _: 200 },

  // const (24)
  { _: 200 },

  // de (26)
  { f: 27, _: 200 },

  // def (27)
  { a: 28, _: 200 },

  // defa (28)
  { u: 29, _: 200 },

  // defau (29)
  { l: 30, _: 200 },

  // defaul (30)
  { t: 31, _: 200 },

  // default (31)
  { _: 200 },

  // o (29)
  { f: 65, _: 200 },

  // p (30)
  { u: 67, _: 200 },

  // r (35)
  { e: 71, _: 200 },

  // enum (36)
  { _: 200 },

  // s (37)
  { w: 79, _: 200 },

  // t (38)
  { y: 85, _: 200 },

  // fo (39)
  { r: 40, _: 200 },

  // for (40)
  { _: 200 },

  // v (42)
  { a: 89, _: 200 },

  // w (44)
  { h: 94, _: 200 },

  // in (46)
  { t: 47, _: 200 },

  // int (47)
  { e: 48, _: 200 },

  // inte (48)
  { r: 49, _: 200 },

  // inter (49)
  { f: 50, _: 200 },

  // interf (50)
  { a: 51, _: 200 },

  // interfa (51)
  { c: 52, _: 200 },

  // interac (52)
  { e: 53, _: 200 },

  // interface (53)
  { _: 200 },

  // le (55)
  { t: 56, _: 200 },

  // let (56)
  { _: 200 },

  // lo (58)
  { g: 59, _: 200 },

  // log (59)
  { _: 200 },

  // of (65)
  { _: 200 },

  // pu (67)
  { s: 68, _: 200 },

  // pus (68)
  { h: 69, _: 200 },

  // push (69)
  { _: 200 },

  // re (71)
  { t: 72, _: 200 },

  // ret (72)
  { u: 73, _: 200 },

  // retu (73)
  { r: 74, _: 200 },

  // retur (74)
  { n: 75, _: 200 },

  // return (75)
  { _: 200 },

  // do (77)
  { _: 200 },

  // sw (79)
  { i: 80, _: 200 },

  // swi (80)
  { t: 81, _: 200 },

  // swit (81)
  { c: 82, _: 200 },

  // switc (82)
  { h: 83, _: 200 },

  // switch (83)
  { _: 200 },

  // ty (85)
  { p: 86, _: 200 },

  // typ (86)
  { e: 87, _: 200 },

  // type (87)
  { _: 200 },

  // va (89)
  { r: 90, _: 200 },

  // var (90)
  { _: 200 },

  // if (92)
  { _: 200 },

  // wh (94)
  { i: 95, _: 200 },

  // whi (95)
  { l: 96, _: 200 },

  // whil (96)
  { e: 97, _: 200 },

  // while (97)
  { _: 200 },

  // = (100)
  { "=": 112 },

  // ++ (101)
  {},

  // -- (102)
  {},

  // * (103)
  {},

  // / (104)
  {},

  // % (105)
  {},

  // + (106)
  { "+": 101 },

  // - (107)
  { "-": 102 },

  // < (108)
  { "=": 109 },

  // <= (109)
  {},

  // >= (110)
  {},

  // > (111)
  { "=": 110 },

  // == (112)
  { "=": 114 },

  // != (113)
  { "=": 115 },

  // === (114)
  {},

  // !== (115)
  {},

  // ! (116)
  { "=": 113 },

  // || (117)
  {},

  // && (118)
  {},

  // & (119)
  { "&": 118 },

  // | (120)
  { "|": 117 },

  // . (121)
  {
    "0": 132,
    "1": 132,
    "2": 132,
    "3": 132,
    "4": 132,
    "5": 132,
    "6": 132,
    "7": 132,
    "8": 132,
    "9": 132,
  },

  // , (122)
  {},

  // ; (123)
  {},

  // : (124)
  {},

  // { (125)
  {},

  // } (126)
  {},

  // ( (127)
  {},

  // ) (128)
  {},

  // [ (129)
  {},

  // ] (130)
  {},

  // INT (131)
  {
    "0": 131,
    "1": 131,
    "2": 131,
    "3": 131,
    "4": 131,
    "5": 131,
    "6": 131,
    "7": 131,
    "8": 131,
    "9": 131,
    ".": 132,
  },

  // FLOAT (132)
  {
    "0": 132,
    "1": 132,
    "2": 132,
    "3": 132,
    "4": 132,
    "5": 132,
    "6": 132,
    "7": 132,
    "8": 132,
    "9": 132,
  },

  // STRING (133)
  { '"': 134 },

  // STRING_END (134)
  {},

  // IDENTIFICADOR (200)
  {
    a: 200,
    b: 200,
    c: 200,
    d: 200,
    e: 200,
    f: 200,
    g: 200,
    h: 200,
    i: 200,
    j: 200,
    k: 200,
    l: 200,
    m: 200,
    n: 200,
    ñ: 200,
    o: 200,
    p: 200,
    q: 200,
    r: 200,
    s: 200,
    t: 200,
    u: 200,
    v: 200,
    w: 200,
    x: 200,
    y: 200,
    z: 200,
    "0": 200,
    "1": 200,
    "2": 200,
    "3": 200,
    "4": 200,
    "5": 200,
    "6": 200,
    "7": 200,
    "8": 200,
    "9": 200,
    _: 200,
  },
];

type LexedToken = { token: number; word: string; value?: string };
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
      7: 1020,
      11: 1030,
      24: 1050,
      31: 1060,
      36: 1080,
      40: 1090,
      53: 1110,
      56: 1120,
      59: 1130,
      65: 1140,
      69: 1150,
      75: 1160,
      77: 1070,
      83: 1170,
      87: 1180,
      90: 1190,
      92: 1100,
      97: 1200,
      100: 2005,
      101: 2010,
      102: 2020,
      103: 2030,
      104: 2040,
      105: 2050,
      106: 2060,
      107: 2070,
      108: 2080,
      109: 2090,
      110: 2100,
      111: 2110,
      112: 2120,
      113: 2130,
      114: 2140,
      115: 2150,
      116: 2160,
      117: 2180,
      118: 2170,
      119: 2190,
      120: 2200,
      121: 3010,
      122: 3020,
      123: 3030,
      124: 3040,
      125: 4010,
      126: 4020,
      127: 5010,
      128: 5020,
      129: 5030,
      130: 5040,
      131: 6000,
      132: 6010,
      134: 7000,
      200: 8000,
    };

    const tokenCode = stateToToken[state];
    if (!tokenCode) {
      return null;
    }

    const tokenInfo = tokenByCode[tokenCode];
    if (!tokenInfo) {
      return null;
    }

    if (state === 200) {
      const reserved = reservedWords[lexeme];
      return reserved ?? tokenInfo;
    }

    return tokenInfo;
  }

  public lexer(input: string): LexedToken[] {
    const tokens: LexedToken[] = [];
    let i = 0;
    const n = input.length;

    while (i < n) {
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
              });
              i = lastValidIndex;
              break;
            }
          }
          break;
        }

        currentRow = nextRow;
        lexeme += char;

        const tokenInfo = this.getTokenForState(currentRow, lexeme);
        if (tokenInfo) {
          lastValidState = currentRow;
          lastValidLexeme = lexeme;
          lastValidIndex = i + 1;
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
