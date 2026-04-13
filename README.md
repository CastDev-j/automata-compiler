# CAT language compiler

## automata-compiler

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

Run tests:

```bash
bun test
```

## Structure (cambiar para el miercoles)

automata-compiler/
├── app/
│ ├── compiler/
│ │ ├── lexer.ts # Análisis léxico
│ │ ├── parser.ts # Análisis sintáctico
│ │ ├── ast.ts # Definiciones del AST
│ │ ├── checker.ts # Análisis semántico (opcional)
│ │ └── codegen.ts # Generación de código
│ ├── tests/
│ │ ├── lexer.test.ts
│ │ ├── parser.test.ts
│ │ └── integration.test.ts
│ ├── examples/
│ │ └── demo.cat
│ └── index.ts # Punto de entrada (orquesta todo)
├── package.json
├── tsconfig.json
└── README.md
