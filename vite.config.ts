/*
 * @Date: 2025-03-03 14:29:22
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-07 11:47:05
 * @Description:
 */
import react from '@vitejs/plugin-react';

import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import { type PluginOption, defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
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
    viteCompression({
      verbose: true, // 控制台输出压缩结果
      disable: false, // 是否禁用
      threshold: 10240, // 大于 10kb 的文件才压缩
      algorithm: 'gzip', // 压缩算法，可选 ['gzip', 'brotliCompress', 'deflate', 'deflateRaw']
      ext: '.gz', // 生成的压缩包后缀
    }),
    // 打包分析插件（只在生产环境启用）
    visualizer({
      template: 'treemap',
      open: false, // 打包完成后不自动打开报告
      filename: 'bundle-analysis.html', // 分析文件输出路径
      gzipSize: true, // 显示 gzip 压缩后的尺寸
      brotliSize: true, // 显示 brotli 压缩后的尺寸
    }) as PluginOption,
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 可选：手动拆分 chunk
          antd: ['antd'],
          react: ['react', 'react-dom'],
          icons: ['@ant-design/icons'],
        },
        // 入口文件归类到 js 目录
        entryFileNames: 'js/[name]-[hash].js',
        // 代码分割后的 chunk 文件归类到 js 目录
        chunkFileNames: 'js/[name]-[hash].js',
        // 静态资源文件按类型分类
        assetFileNames: assetInfo => {
          const extType = assetInfo.name?.split('.').at(1);
          if (/png|jpe?g|svg|gif|webp|avif/i.test(extType || '')) {
            return 'images/[name]-[hash][extname]';
          }
          if (/css|scss|sass|less/i.test(extType || '')) {
            return 'styles/[name]-[hash][extname]';
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType || '')) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
      },
    },
  },
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
