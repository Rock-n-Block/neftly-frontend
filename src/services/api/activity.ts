import { TTopUserReq } from 'typings';
import axios from '../../core/axios';

export default {
  getActivity: (page: string | number, query: any) => {
    let queryStr = '&type=';
    if (query.length)
      query.forEach((key: any, index: any) => {
        let formattedKey = key.toLowerCase();
        switch (formattedKey) {
          case 'sales':
            formattedKey = 'sale';
            break;
          case 'listings':
            formattedKey = 'list';
            break;
          case 'transfers':
            formattedKey = 'transfer';
            break;
          case 'likes':
            formattedKey = 'like';
            break;
          case 'followings':
            formattedKey = 'follow';
            break;
          case 'burns':
            formattedKey = 'burn';
            break;
          case 'mints':
            formattedKey = 'mint';
            break;
          default:
            break;
        }
        if (index !== query.length - 1) formattedKey = `${formattedKey},`;
        queryStr = queryStr.concat(formattedKey);
      });
    return axios.get(`activity/?page=${page}${query.length ? `${queryStr}` : ''}`);
  },
  getNotification: () =>
    axios.get(`activity/notification/?network=${localStorage.netfly_nft_chainName}`),
  readNotification: (data: any) =>
    axios.post(`/activity/notification/?network=${localStorage.netfly_nft_chainName}`, data),
  getTopUsers: ({ type, sortPeriod }: TTopUserReq) =>
    axios.get('/activity/topusers', {
      params: {
        type,
        sort_period: sortPeriod,
        network: localStorage.netfly_nft_chainName?.toLowerCase(),
      },
    }),
};
