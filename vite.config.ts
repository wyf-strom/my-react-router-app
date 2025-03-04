/*
 * @Date: 2025-03-03 14:29:22
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 09:48:46
 * @Description:
 */
import react from '@vitejs/plugin-react';

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
});
