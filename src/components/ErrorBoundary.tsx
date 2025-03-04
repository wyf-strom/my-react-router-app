/*
 * @Date: 2025-03-03 14:48:29
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 11:10:16
 * @Description: 错误边界组件
 */
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error: any = useRouteError();

  return (
    <div className='error-container'>
      <h1>哎呀，出错了！</h1>
      <p>{error?.message || '未知错误'}</p>
      <button onClick={() => window.location.reload()}>重新加载</button>
    </div>
  );
}
