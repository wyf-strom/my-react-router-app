/*
 * @Date: 2025-03-03 14:35:30
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-03 14:51:09
 * @Description:
 */
import { useLoaderData } from 'react-router-dom';

export default function User() {
  const userData = useLoaderData();

  return (
    <div className='user-profile'>
      <h2>{userData.name}</h2>
      <p>邮箱: {userData.email}</p>
      <p>注册时间: {new Date(userData.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
