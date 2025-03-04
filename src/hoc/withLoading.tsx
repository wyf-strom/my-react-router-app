/*
 * @Date: 2025-03-03 15:04:38
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 10:19:25
 * @Description:
 */
import React from 'react';

import {
  BaseSkeleton,
  PageSkeleton,
  PostSkeleton,
  UserSkeleton,
} from '../components/LoadingSkeleton';

import './index.scss';

const skeletonComponents = {
  user: UserSkeleton,
  post: PostSkeleton,
  default: PageSkeleton,
  dashboard: () => (
    <div className='dashboard-skeleton'>
      <div className='skeleton-sidebar' />
      <div className='skeleton-main'>
        <BaseSkeleton lines={5} />
      </div>
    </div>
  ),
};
type SkeletonType = keyof typeof skeletonComponents;

export const withLoading = (
  componentPromise: any,
  skeletonType: SkeletonType = 'default'
) => {
  const LazyComponent = React.lazy(componentPromise);
  const Skeleton = skeletonComponents[skeletonType] || skeletonComponents.default;

  return (props: any) => (
    <React.Suspense fallback={<Skeleton />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// 带错误处理的增强版
export const withLoadingAndError = (
  componentPromise: any,
  skeletonType: SkeletonType
) => {
  const EnhancedComponent = withLoading(
    () => componentPromise().catch(() => ({ default: () => <div>组件加载失败</div> })),
    skeletonType
  );

  return EnhancedComponent;
};
