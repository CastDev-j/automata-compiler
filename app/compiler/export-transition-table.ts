import { join } from "node:path";

import * as XLSX from "xlsx";

import {
  stateToTokenCode,
  tokenTable,
  transitionTable,
} from "@compiler/tokenizer";

type TransitionRow = {
  estado: number;
  simbolo: string;
  siguienteEstado: number;
};

type TokenStateRow = {
  estado: number;
  codigoToken: number;
  nombreToken: string;
};

type TokenCatalogRow = {
  estadoAutomata: number;
  codigoToken: number;
  nombreToken: string;
  categoria: string;
};

type MatrixRow = {
  estado: number;
  tokenFinal: string;
  categoria: string;
  transicionesDefinidas: number;
} & Record<string, string | number>;

type StateDetailRow = {
  estado: number;
  esFinal: string;
  codigoToken: number | "";
  nombreToken: string;
  categoria: string;
  totalTransiciones: number;
  descripcion: string;
};

const alfabetoOrdenado = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
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
  "+",
  "-",
  "*",
  "/",
  "%",
  "<",
  ">",
  "=",
  "!",
  "&",
  "|",
  ".",
  ",",
  ";",
  ":",
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  "_",
  '"',
  " ",
];

function getTokenCategory(tokenCode: number): string {
  if (tokenCode >= 1000 && tokenCode < 2000) return "Reservada";
  if (tokenCode >= 2000 && tokenCode < 3000) return "Operador";
  if (tokenCode >= 3000 && tokenCode < 4000) return "Puntuacion";
  if (tokenCode >= 4000 && tokenCode < 5000) return "Llave";
  if (tokenCode >= 5000 && tokenCode < 6000) return "Parentesis/Corchete";
  if (tokenCode >= 6000 && tokenCode < 7000) return "Numero";
  if (tokenCode >= 7000 && tokenCode < 8000) return "String";
  if (tokenCode >= 8000) return "Identificador";
  return "Otro";
}

function getTokenByCode(): Map<number, string> {
  const tokenByCode = new Map<number, string>();

  Object.values(tokenTable).forEach(({ token, word }) => {
    tokenByCode.set(token, word);
  });

  return tokenByCode;
}

function getEstadosOrdenados(): number[] {
  const estados = new Set<number>();

  transitionTable.forEach((transitions, index) => {
    if (transitions) {
      estados.add(index);
    }
  });

  Object.keys(stateToTokenCode).forEach((state) => {
    estados.add(Number(state));
  });

  return [...estados].sort((a, b) => a - b);
}

function buildTransitionRows(): TransitionRow[] {
  const rows: TransitionRow[] = [];

  transitionTable.forEach((transitions, estado) => {
    Object.entries(transitions).forEach(([symbol, nextState]) => {
      rows.push({
        estado,
        simbolo: symbol,
        siguienteEstado: nextState,
      });
    });
  });

  return rows.sort(
    (a, b) => a.estado - b.estado || a.simbolo.localeCompare(b.simbolo),
  );
}

function buildTokenStateRows(): TokenStateRow[] {
  const tokenByCode = getTokenByCode();

  return Object.entries(stateToTokenCode)
    .map(([estado, codigoToken]) => ({
      estado: Number(estado),
      codigoToken,
      nombreToken: tokenByCode.get(codigoToken) ?? "DESCONOCIDO",
    }))
    .sort((a, b) => a.estado - b.estado);
}

function buildTokenCatalogRows(): TokenCatalogRow[] {
  return Object.entries(tokenTable)
    .map(([estadoAutomata, data]) => ({
      estadoAutomata: Number(estadoAutomata),
      codigoToken: data.token,
      nombreToken: data.word,
      categoria: getTokenCategory(data.token),
    }))
    .sort((a, b) => a.estadoAutomata - b.estadoAutomata);
}

function buildMatrixRows(): MatrixRow[] {
  const estados = getEstadosOrdenados();
  const tokenByCode = getTokenByCode();

  return estados.map((estado) => {
    const transitions = transitionTable[estado] ?? {};
    const codigoToken = stateToTokenCode[estado];
    const nombreToken = codigoToken
      ? (tokenByCode.get(codigoToken) ?? "DESCONOCIDO")
      : "";

    const row: MatrixRow = {
      estado,
      tokenFinal: nombreToken,
      categoria: codigoToken ? getTokenCategory(codigoToken) : "No final",
      transicionesDefinidas: Object.keys(transitions).length,
    };

    alfabetoOrdenado.forEach((simbolo) => {
      const key = `simbolo:${simbolo === " " ? "espacio" : simbolo}`;
      const next = transitions[simbolo];
      row[key] = next ?? "";
    });

    return row;
  });
}

function buildStateDetailRows(): StateDetailRow[] {
  const estados = getEstadosOrdenados();
  const tokenByCode = getTokenByCode();

  return estados.map((estado) => {
    const transitions = transitionTable[estado] ?? {};
    const codigoToken = stateToTokenCode[estado];
    const nombreToken = codigoToken
      ? (tokenByCode.get(codigoToken) ?? "DESCONOCIDO")
      : "";
    const categoria = codigoToken ? getTokenCategory(codigoToken) : "No final";
    const cantidad = Object.keys(transitions).length;
    const descripcion =
      cantidad === 0
        ? "Sin transiciones definidas; depende de reglas virtuales o es estado de cierre."
        : `Tiene ${cantidad} transiciones explicitas en la tabla.`;

    return {
      estado,
      esFinal: codigoToken ? "Si" : "No",
      codigoToken: codigoToken ?? "",
      nombreToken,
      categoria,
      totalTransiciones: cantidad,
      descripcion,
    };
  });
}

async function exportTransitionTableXlsx(): Promise<string> {
  const workbook = XLSX.utils.book_new();

  const transitionRows = buildTransitionRows();
  const tokenStateRows = buildTokenStateRows();
  const tokenCatalogRows = buildTokenCatalogRows();
  const matrixRows = buildMatrixRows();
  const stateDetailRows = buildStateDetailRows();

  const transitionSheet = XLSX.utils.json_to_sheet(transitionRows);
  const tokenStateSheet = XLSX.utils.json_to_sheet(tokenStateRows);
  const tokenCatalogSheet = XLSX.utils.json_to_sheet(tokenCatalogRows);
  const matrixSheet = XLSX.utils.json_to_sheet(matrixRows);
  const stateDetailSheet = XLSX.utils.json_to_sheet(stateDetailRows);

  XLSX.utils.book_append_sheet(workbook, transitionSheet, "Transiciones");
  XLSX.utils.book_append_sheet(workbook, matrixSheet, "MatrizAlfabeto");
  XLSX.utils.book_append_sheet(workbook, stateDetailSheet, "DetalleEstados");
  XLSX.utils.book_append_sheet(workbook, tokenStateSheet, "EstadoAToken");
  XLSX.utils.book_append_sheet(workbook, tokenCatalogSheet, "CatalogoTokens");

  const outputPath = join(
    import.meta.dir,
    "..",
    "examples",
    "transition-table.xlsx",
  );
  XLSX.writeFile(workbook, outputPath);

  return outputPath;
}

if (import.meta.main) {
  const path = await exportTransitionTableXlsx();
  console.log(`Archivo XLSX generado en: ${path}`);
}

export { exportTransitionTableXlsx };
