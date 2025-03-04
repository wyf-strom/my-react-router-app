/*
 * @Date: 2025-03-03 14:37:07
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 17:17:28
 * @Description: 路由配置
 */
import React from 'react';

import request from '@/api/request.ts';

import AuthErrorPage from '../components/AuthErrorPage.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import Layout from '../components/Layout.js';
import NotFound from '../components/NotFound.js';
import { withLoadingAndError } from '../hoc/withLoading.jsx';
import Dashboard from '../pages/Dashboard.js';
import Home from '../pages/Home.js';

// 动态导入组件（带错误边界）
const lazyLoad = (path: string) =>
  React.lazy(() =>
    import(`${/* @vite-ignore */ path}`).catch(() => ({
      default: () => <div>组件加载失败</div>,
    }))
  );

// 用户页数据加载器
const userLoader = async ({ params }: { params: any }) => {
  const response = await request.get(`/api/users/${params.userId}`);
  if (!response.ok) throw new Error('用户数据加载失败');
  return response.json();
};

// 文章页数据加载器
const postLoader = async ({ params }: { params: any }) => {
  const demoCheck = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const isok = Math.random() > 0.5;
        if (isok) {
          resolve('ok');
        }
        resolve('ok');
        // reject("error")
      }, 1000 * 10);
    });
  const result = await demoCheck();
  if (!result) throw new Error('文章数据加载失败');
  return result;
};

// 添加带权限校验的loader
const protectedLoader = async () => {
  const authCheck = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const isok = Math.random() > 0.5;
        if (isok) {
          resolve('ok');
        }
        reject('error');
      }, 1000 * 3);
    });
  const user = await authCheck();
  if (!user) throw new Error('需要登录');
  return user;
};

// 动态导入组件（带骨架屏和错误处理）
const User = withLoadingAndError(() => import('../pages/User.tsx'), 'user');
const Demo = withLoadingAndError(() => import('../pages/Demo.tsx'), 'user');
const Demo1 = lazyLoad('../pages/Demo.tsx');
const Demo2 = withLoadingAndError(() => import('../pages/Demo2.tsx'), 'default');
const Post = withLoadingAndError(() => import('../pages/Post.tsx'), 'default');

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />, //
    children: [
      {
        index: true,
        path: 'home',
        element: <Home />,
      },
      {
        path: 'test',
        children: [
          {
            path: 'demo',
            element: <Demo1 />,
          },
          {
            path: 'demo2',
            element: <Demo2 />,
          },
        ],
      },
      {
        path: 'users/:userId',
        loader: userLoader,
        element: <User />, // 自动应用骨架屏
      },
      {
        path: 'posts/:postId',
        loader: postLoader,
        element: <Post />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: protectedLoader,
        errorElement: <AuthErrorPage />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
