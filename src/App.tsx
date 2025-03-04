/*
 * @Date: 2025-03-03 14:29:22
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 10:19:02
 * @Description:
 */
import { Route, Routes } from 'react-router-dom';

import routes from './config/routes';

// 递归渲染路由的方法
const renderRoutes = (routes: any[]) => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} index={route.index} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

export default function App() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
