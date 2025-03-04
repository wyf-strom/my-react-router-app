/*
 * @Date: 2025-03-04 17:32:41
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 17:36:57
 * @Description:
 */
import { makeAutoObservable } from 'mobx';

import type { RootStore } from './rootStore';

export class UserStore {
  name = 'John';

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  setName = (name: string) => {
    this.name = name;
  };
}
