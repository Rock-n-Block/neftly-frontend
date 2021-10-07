import axios from '../../core/axios';

export default {
  getRates: () => axios.get(`/rates/?network=${localStorage.netfly_nft_chainName}`),
};
