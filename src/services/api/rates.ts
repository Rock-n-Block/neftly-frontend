import axios from '../../core/axios';

export default {
  getRates: () => axios.get(`/rates/?network=${localStorage.lessnft_nft_chainName}`),
};
