/*
 * @Date: 2025-03-03 14:29:22
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 17:52:36
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { RootStore, RootStoreProvider } from '@store/rootStore';

import routes from './config/routes';
import './index.css';

const router = createHashRouter(routes);
const rootStore = new RootStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootStoreProvider value={rootStore}>
      <RouterProvider router={router} />
    </RootStoreProvider>
  </React.StrictMode>
);
