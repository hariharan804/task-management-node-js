import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import node from 'eslint-plugin-node';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import promise from 'eslint-plugin-promise';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
// eslint-disable-next-line import/order
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: { globals: globals.node },
  plugins: {
    js,
    node,
    import: importPlugin,
    promise,
    security,
    unicorn,
    sonarjs,
    perfectionist,
    prettier,
  },

  extends: ['js/recommended', tseslint.configs.recommended, prettierConfig],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    'node/no-unsupported-features/es-syntax': 'off', // Allows modern ES syntax
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        // 'newlines-between': 'off',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'fastify',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'knex',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@config/**',
            group: 'internal',
          },
          {
            pattern: '@services/**',
            group: 'internal',
          },
          {
            pattern: '@models/**',
            group: 'internal',
          },
          {
            pattern: '@routes/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'promise/catch-or-return': 'error', // Ensure Promises handle errors
    'security/detect-object-injection': 'warn', // Warns against object injection vulnerabilities
    'unicorn/prefer-optional-catch-binding': 'error', // Modern JavaScript best practice
    'sonarjs/no-duplicate-string': 'warn', // Reduces duplicate strings
    'perfectionist/sort-imports': 'error', // Ensures imports are sorted
    'prettier/prettier': 'error', // Enforce Prettier formatting
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/.env',
    '**/.env.*.local',
    '**/.env.development',
    '**/.env.production',
    '**/.env.*',
  ],
});
