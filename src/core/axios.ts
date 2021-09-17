import axios from 'axios';

axios.defaults.baseURL = 'https://lessnft.rocknblock.io/api/v1/';

axios.interceptors.request.use(
  (config) => {
    config.headers.common = {
      ...config.headers.common,
      Authorization: `${
        localStorage.getItem('nft_token') ? `Token ${localStorage.getItem('nft_token')}` : ''
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
