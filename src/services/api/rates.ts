import axios from '../../core/axios';

export default {
  getRates: () => axios.get(`/rates/?network=${localStorage.nftcrowd_nft_chainName}`),
};
