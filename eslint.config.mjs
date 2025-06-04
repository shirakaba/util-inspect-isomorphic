import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import pluginJs from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const { configs: tsEslintConfigs } = tsEslintPlugin;
const { 'disable-type-checked': disableTypeChecked } = tsEslintConfigs;

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser, ecmaVersion: 'latest' },
  },
  pluginJs.configs.recommended,

  // Untyped linting of TypeScript. We override this later with typed linting.
  ...tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { settings: { react: { version: 'detect' } } },

  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,

  // Typed linting of TypeScript.
  // https://typescript-eslint.io/getting-started/typed-linting/
  // https://typescript-eslint.io/troubleshooting/typed-linting/#traditional-project-issues
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      // Based on: https://github.com/typescript-eslint/typescript-eslint/blob/958fecaef10a26792dc00e936e98cb19fd26d05f/.eslintrc.js
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['tsconfig.eslint.json'],
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],

    languageOptions: {
      parserOptions: disableTypeChecked.parserOptions ?? {},
    },

    rules: disableTypeChecked.rules ?? {},
  },
  {
    rules: {
      // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/345#issuecomment-2269783683
      'import/no-unresolved': 'off',

      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc' },
          pathGroups: [
            {
              pattern: '../../../../**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '../../../**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '../../**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '../**',
              group: 'parent',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
        },
      ],

      'linebreak-style': ['error', 'unix'],

      'no-constant-condition': [
        'error',
        {
          checkLoops: false,
        },
      ],

      'no-prototype-builtins': 'off',

      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      semi: ['error', 'always'],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Never sure what they mean by an "error typed value".
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
];
