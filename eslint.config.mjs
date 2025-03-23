import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig({
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: { globals: globals.node },
  plugins: { js },
  extends: ["js/recommended", tseslint.configs.recommended],
  rules: { "@typescript-eslint/no-explicit-any": "off" },
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/coverage/**",
    "**/.env",
    "**/.env.*.local",
    "**/.env.development",
    "**/.env.production",
    "**/.env.*",
  ],
});
