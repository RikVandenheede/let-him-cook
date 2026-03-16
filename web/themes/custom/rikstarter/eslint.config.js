import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "**/*.min.js"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,js,mts,mjs}", "components/**/*.{ts,js,mts,mjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        Drupal: "readonly",
        drupalSettings: "readonly",
        once: "readonly",
        $: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["*.config.{js,mjs,cjs,ts}", "vite/**/*.ts", "eslint.config.js", "vite.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  eslintConfigPrettier,
);
