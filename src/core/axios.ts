import axios from 'axios';
import { is_production } from '../config';

axios.defaults.baseURL = is_production
  ? 'https://app.kephi.io/api/v1/'
  : 'https://app-sandbox.kephi.io/api/v1/';

axios.interceptors.request.use(
  (config) => {
    config.headers.common = {
      ...config.headers.common,
      Authorization: `${
        localStorage.getItem('netfly_nft_token')
          ? `Token ${localStorage.getItem('netfly_nft_token')}`
          : ''
      }`,
    };
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axios;
