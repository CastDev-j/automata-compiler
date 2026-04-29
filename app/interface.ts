const tokens = [
  "===", "!==",           
  "<=", ">=", "!=", "==", "||", "&&",  
  "(", ")", "{", "}", ";", "=", "!", "&", "|", "<", ">",  
];

const pattern = new RegExp(
  tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "g"
);

export const formatDocument = (entry: string) => {
  let text = (entry + "\r").replaceAll("\r", " \r");

  text = text.replace(pattern, (match) => ` ${match} `);

  return text;
};

export interface State {
  a?: number | undefined;
  b?: number | undefined;
  c?: number | undefined;
  d?: number | undefined;
  e?: number | undefined;
  f?: number | undefined;
  g?: number | undefined;
  h?: number | undefined;
  i?: number | undefined;
  j?: number | undefined;
  k?: number | undefined;
  l?: number | undefined;
  m?: number | undefined;
  n?: number | undefined;
  ñ?: number | undefined;
  o?: number | undefined;
  p?: number | undefined;
  q?: number | undefined;
  r?: number | undefined;
  s?: number | undefined;
  t?: number | undefined;
  u?: number | undefined;
  v?: number | undefined;
  w?: number | undefined;
  x?: number | undefined;
  y?: number | undefined;
  z?: number | undefined;
  "0"?: number | undefined;
  "1"?: number | undefined;
  "2"?: number | undefined;
  "3"?: number | undefined;
  "4"?: number | undefined;
  "5"?: number | undefined;
  "6"?: number | undefined;
  "7"?: number | undefined;
  "8"?: number | undefined;
  "9"?: number | undefined;
  "+"?: number | undefined;
  "-"?: number | undefined;
  "*"?: number | undefined;
  "/"?: number | undefined;
  "%"?: number | undefined;
  "<"?: number | undefined;
  ">"?: number | undefined;
  "="?: number | undefined;
  "!"?: number | undefined;
  "&"?: number | undefined;
  "|"?: number | undefined;
  "."?: number | undefined;
  ","?: number | undefined;
  ";"?: number | undefined;
  ":"?: number | undefined;
  "?:"?: number | undefined;
  "{"?: number | undefined;
  "}"?: number | undefined;
  "("?: number | undefined;
  ")"?: number | undefined;
  "["?: number | undefined;
  "]"?: number | undefined;
  '"'?: number | undefined;
  " "?: number | undefined;
  "\t"?: number | undefined;
  "\n"?: number | undefined;
  "\r"?: number | undefined;
  _?: number | undefined;
}
