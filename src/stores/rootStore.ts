/*
 * @Date: 2025-03-04 17:28:08
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 17:36:49
 * @Description:
 */
// 上下文相关配置
import { createContext, useContext } from 'react';

import { UserStore } from './userStore';

//根仓库
export class RootStore {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore(this);
  }
}

const RootStoreContext = createContext<RootStore | null>(null);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) throw new Error('Missing RootStoreProvider');
  return store;
};
