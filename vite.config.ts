/*
 * @Date: 2025-03-03 14:29:22
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 17:49:36
 * @Description:
 */
import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          'babel-plugin-transform-react-remove-prop-types',
        ],
      },
    }),
    eslint({
      fix: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/stores/'),
    },
  },
});
