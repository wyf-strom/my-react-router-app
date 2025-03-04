/*
 * @Date: 2025-03-03 14:33:50
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-03 16:55:51
 * @Description:
 */
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='layout'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/users/123'>User 123</Link>
          </li>
          <li>
            <Link to='/posts/456'>Post 456</Link>
          </li>
        </ul>
      </nav>

      <div className='content' style={{ height: '100vh' }}>
        {/* Outlet 会自动渲染嵌套路由内容 */}
        <Outlet />
      </div>
    </div>
  );
}
