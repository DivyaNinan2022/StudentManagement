import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    parser: "@typescript-eslint/parser", // Use TypeScript parser
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"], // Add React plugin
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended", // Add React recommended rules
      "plugin:react-hooks/recommended", // Add React Hooks rules
    ],
    rules: {
      "react/react-in-jsx-scope": "off", // Disable if using React 17+ with JSX runtime
      "react/prop-types": "off", // Disable prop-types (not needed with TypeScript)
      "@typescript-eslint/no-unused-vars": "warn", // Warn on unused variables
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  }),
];

export default eslintConfig;