import { IBackendPriceHistory, TPriceHistoryPeriod, TTopUserReq } from 'typings';
import axios from '../../core/axios';
import { AxiosResponse } from 'axios';

export default {
  getActivity: (page: string | number, query: any) => {
    let queries = '';
    if (query.length)
      query.forEach((key: any) => {
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
        queries = queries.concat(`${formattedKey},`);
      });
    return axios.get('activity/', {
      params: { page, network: localStorage?.nftcrowd_nft_chainName, type: queries },
    });
  },
  getNotification: () =>
    axios.get(`activity/notification/?network=${localStorage.nftcrowd_nft_chainName}`),
  readNotification: (data: any) =>
    axios.post(`/activity/notification/?network=${localStorage.nftcrowd_nft_chainName}`, data),
  getTopUsers: ({ type, sortPeriod }: TTopUserReq) =>
    axios.get('/activity/topusers/', {
      params: {
        type,
        sort_period: sortPeriod,
        network: localStorage?.nftcrowd_nft_chainName,
      },
    }),

  getTopCollections: ({ type, sortPeriod }: TTopUserReq) =>
    axios.get('/activity/top-collections/', {
      params: {
        type,
        sort_period: sortPeriod,
        network: localStorage?.nftcrowd_nft_chainName,
      },
    }),

  getPriceHistory: (
    id: string,
    period: TPriceHistoryPeriod,
  ): Promise<AxiosResponse<IBackendPriceHistory>> =>
    axios.get(`/activity/price_history/${id}`, {
      params: {
        period,
      },
    }),
};
