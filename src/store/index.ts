import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { User } from './User';

const RootModel = types.model({
  user: User,
});
export const Store = RootModel.create({
  user: {
    address: '',
    is_verificated: false,
    display_name: '',
    email: '',
    balance: { eth: '0', weth: '0' },
    follows_count: 0,
    followers_count: 0,
    search: '',
    is_searching: false,
  },
});

export const rootStore = Store;

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
