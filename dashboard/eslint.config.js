import eslint from "@eslint/js";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    rules: {
      "no-console": "off",
      "no-undef": "error",
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    ignores: ["dist/**/*"],
  },
];
