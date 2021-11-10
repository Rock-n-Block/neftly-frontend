import axios from 'axios';

import { is_production } from '../config';

axios.defaults.baseURL = is_production
  ? 'https://app.kephi.io/api/v1/'
  : 'https://tron-marketplace.rocknblock.io/api/v1/';

axios.interceptors.request.use(
  (config) => {
    config.headers.common = {
      ...config.headers.common,
      Authorization: `${
        localStorage.getItem('nftcrowd_nft_token')
          ? `Token ${localStorage.getItem('nftcrowd_nft_token')}`
          : ''
      }`,
    };
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;
