import { flow, types } from 'mobx-state-tree';

import { userApi } from '../services/api';

const Follower = types.model({
  avatar: types.maybeNull(types.optional(types.string, '')),
  name: types.optional(types.string, ''),
  his_followers: types.optional(types.number, 0),
  id: types.optional(types.union(types.number, types.string, types.null), null),
});

export const Balance = types.model({
  eth: types.optional(types.string, '0'),
  weth: types.optional(types.string, '0'),
});
/* eslint-disable no-param-reassign */
export const User = types
  .model({
    address: types.string,
    avatar: types.optional(types.maybeNull(types.string), null),
    bio: types.optional(types.maybeNull(types.string), null),
    custom_url: types.optional(types.maybeNull(types.string), null),
    display_name: types.optional(types.maybeNull(types.string), null),
    email: types.optional(types.maybeNull(types.string), null),
    followers: types.optional(types.array(Follower), []),
    followers_count: types.optional(types.maybeNull(types.number), null),
    follows: types.optional(types.array(Follower), []),
    follows_count: types.optional(types.maybeNull(types.number), null),
    id: types.optional(types.union(types.number, types.string), ''),
    cover: types.optional(types.maybeNull(types.string), null),
    is_verificated: types.boolean,
    likes: types.optional(types.number, 0),
    instagram: types.optional(types.maybeNull(types.string), null),
    twitter: types.optional(types.maybeNull(types.string), null),
    facebook: types.optional(types.maybeNull(types.string), null),
    site: types.optional(types.maybeNull(types.string), null),
    balance: types.optional(Balance, {}),
  })
  .actions((self) => {
    const setAddress = (addr: string) => {
      self.address = addr;
    };
    const setBalance = (value: string, currency: 'eth' | 'weth') => {
      if (currency === 'eth') self.balance.eth = value;
      if (currency === 'weth') self.balance.weth = value;
    };
    const addLike = () => {
      self.likes += 1;
    };
    const removeLike = () => {
      self.likes -= 1;
    };
    const setCover = (img: string) => {
      self.cover = img;
    };
    const update = (userData: any) => {
      self.address = userData.address;
      self.avatar = userData.avatar;
      self.bio = userData.bio;
      self.cover = userData.cover;
      self.email = userData.email;
      self.custom_url = userData.custom_url;
      self.display_name = userData.display_name;
      self.followers = userData.followers;
      self.followers_count = userData.followers_count;
      self.follows = userData.follows;
      self.follows_count = userData.follows_count;
      self.id = userData.id;
      self.instagram = userData.instagram;
      self.facebook = userData.facebook;
      self.is_verificated = userData.is_verificated;
      self.likes = userData.likes;
      self.site = userData.site;
      self.twitter = userData.twitter;
    };
    const disconnect = () => {
      self.address = '';
      self.id = '';
    };
    const getMe = flow(function* getMe() {
      try {
        const { data } = yield userApi.getMe();

        update(data);
      } catch (err) {
        console.error(err);
        disconnect();
      }
    });

    return {
      setAddress,
      setBalance,
      setCover,
      addLike,
      removeLike,
      update,
      getMe,
      disconnect,
    };
  })
  .views((self) => ({
    get isAuth() {
      return !!self.address || !!localStorage.getItem('lessnft_nft_token');
    },
  }));

/* eslint-disable no-param-reassign */
