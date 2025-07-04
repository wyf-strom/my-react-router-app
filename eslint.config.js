/*
 * @Date: 2025-07-03 11:31:00
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-07-03 14:14:45
 * @Description:
 */
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  // 基础配置
  { ignores: ['dist'] },
  js.configs.recommended,

  // Prettier 配置
  {
    plugins: { prettier },
    rules: { 'prettier/prettier': 'error' },
  },

  // JavaScript 配置
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // TypeScript 配置（修改后的版本）
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.d.ts'], // 忽略所有 .d.ts 文件
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        project: true, // 自动检测 tsconfig.json
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tsPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
