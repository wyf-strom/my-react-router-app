/*
 * @Date: 2025-03-03 15:03:34
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 09:46:48
 * @Description: 加载骨架屏
 */
import './LoadingSkeleton.scss';

// 基础骨架屏组件
export const BaseSkeleton = ({ lines = 3 }) => (
  <div className='skeleton-container'>
    <div className='skeleton-header' />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className='skeleton-line' />
    ))}
  </div>
);

// 页面专用骨架屏
export const PageSkeleton = () => (
  <div className='page-skeleton'>
    <BaseSkeleton lines={4} />
    <div className='skeleton-spacer' />
    <BaseSkeleton lines={2} />
  </div>
);

// 用户详情页骨架屏
export const UserSkeleton = () => (
  <div className='user-skeleton'>
    <div className='skeleton-avatar' />
    <BaseSkeleton lines={3} />
  </div>
);

// 文章页骨架屏
export const PostSkeleton = () => (
  <div className='post-skeleton'>
    <BaseSkeleton lines={2} />
    <div className='skeleton-image' />
    <BaseSkeleton lines={4} />
  </div>
);
