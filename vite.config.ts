/*
 * @Date: 2025-03-03 14:29:22
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-07 09:32:25
 * @Description:
 */
import react from '@vitejs/plugin-react';

import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';

import { antdTheme } from './src/styles/antd-theme';

// 导入主题配置

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
    // 自动导入组件
    AutoImport({
      imports: ['react'], // 自动导入 React 相关函数
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件
    }),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: antdTheme, // 自定义主题变量
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/stores/'),
    },
  },
});
