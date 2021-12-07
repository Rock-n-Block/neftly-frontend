import axios from 'core/axios';
import { TNullable } from 'typings';
import { IGetSearchResultParams } from '../../typings/api/search';

export default {
  burnToken: (id: string, amount?: string) =>
    axios.post(`store/${id}/burn/?network=${localStorage.lessnft_nft_chainName}`, { amount }),
  createToken: (data: any) =>
    axios.post(`store/create_token/?network=${localStorage.lessnft_nft_chainName}`, data),
  // createToken: (data: any, details: any) => {
  //   data.details = details;
  //   return axios.post('store/create_token/', data);
  // },
  createCollection: (data: any) =>
    axios.post(`store/create_collection/?network=${localStorage.lessnft_nft_chainName}`, data),
  saveToken: (data: any) =>
    axios.post(`store/save_token/?network=${localStorage.lessnft_nft_chainName}`, data),
  saveCollection: (data: any) =>
    axios.post(`store/save_collection/?network=${localStorage.lessnft_nft_chainName}`, data),
  transferToken: (id: string, address: string, amount?: string) => {
    const data = { address, amount };
    if (!amount) delete data.amount;
    return axios.post(`store/transfer/${id}/?network=${localStorage.lessnft_nft_chainName}`, data);
  },
  // saveCollection: (data: any, tx_hash: string) => axios.post(`store/save_collection/${tx_hash}`, data),
  getExplore: (page: number, filter: string, sort: string) =>
    axios.get(
      `store/hot/${page}/?network=${localStorage.lessnft_nft_chainName}&sort=${sort}${
        filter !== 'all' ? `&tag=${filter}` : ''
      }`,
    ),
  getTags: () =>
    axios.get(`store/tags/`, {
      params: {
        network: localStorage.lessnft_nft_chainName,
      },
    }),
  getFavorites: () => axios.get(`store/favorites/?network=${localStorage.lessnft_nft_chainName}`),
  getCollections: () =>
    // TODO: add period
    axios.get(`store/hot_collections/`, {
      params: {
        network: localStorage.lessnft_nft_chainName,
      },
    }),
  getHotBids: () => axios.get(`store/hot_bids/?network=${localStorage.lessnft_nft_chainName}`),
  getCollectionById: (id: number | string, page: number) =>
    axios.get(`store/collection/${id}/?network=${localStorage.lessnft_nft_chainName}`, {
      params: {
        page,
      },
    }),
  getToken: (id: number | string) =>
    axios.get(`store/${id}/?network=${localStorage.lessnft_nft_chainName}`),
  buyToken: (id: number | string, amount: number, sellerId?: string | number) => {
    const data: any = {
      id,
      tokenAmount: amount,
    };
    if (sellerId) data.sellerId = sellerId;
    return axios.post(`/store/buy/?network=${localStorage.lessnft_nft_chainName}`, data);
  },
  getLiked: (address: string, page: number) =>
    axios.get(
      `store/liked/${address}/?network=${localStorage.lessnft_nft_chainName}&page=${page}`,
    ),
  getCreated: (address: string, page: number) =>
    axios.get(`store/created/${address}/${page}/?network=${localStorage.lessnft_nft_chainName}`),
  getCollectibles: (address: string, page: string) =>
    axios.get(`store/owned/${address}/${page}/?network=${localStorage.lessnft_nft_chainName}`),
  getUserCollections: (address: string, page: number) =>
    axios.get(`store/collections/${address}/${page}/`),
  /* getSearchResults: (queries: any, text?: string) => {
    const queriesCopy = { ...queries };
    switch (queriesCopy.is_verified) {
      case 'All':
        delete queriesCopy.is_verified;
        break;
      case 'verified':
        queriesCopy.is_verified = 'true';
        break;
      case 'unverified':
        queriesCopy.is_verified = 'false';
        break;
      default:
        break;
    }
    if (queriesCopy.tags === 'All items') delete queriesCopy.tags;
    let query = `?network=${localStorage.lessnft_nft_chainName}`;
    Object.keys(queriesCopy).forEach((key) => {
      if (queriesCopy[key] || queriesCopy[key] === false || queriesCopy[key] === 0) {
        query = query.concat(`&${key}=${queriesCopy[key]}`);
      }
    });
    return axios.post(`/store/search/${query}`, {
      text: text || '',
    });
  },*/
  getSearchResults: ({
    sort,
    order_by,
    owner,
    on_sale,
    text,
    tags,
    currency,
    is_verified,
    max_price,
    page,
    creator,
  }: IGetSearchResultParams) => {
    return axios.post(
      `/store/search/`,
      {
        text: text || '',
      },
      {
        params: {
          network: localStorage.lessnft_nft_chainName || 'undefined',
          sort,
          order_by,
          owner,
          on_sale,
          currency,
          is_verified,
          max_price,
          page,
          creator,
          tags,
        },
      },
    );
  },
  getFee: (currency: TNullable<string>) =>
    axios.get(
      `/store/fee/?network=${localStorage.lessnft_nft_chainName}${
        currency ? `&currency=${currency}` : ''
      }`,
    ),
  setCollectionCover: (file: any, id: string) => {
    const data = new FormData();
    data.append('id', id);
    data.append('auth_token', localStorage.dds_token);
    data.append('cover', file);
    return axios.post(`/store/set_cover/?network=${localStorage.lessnft_nft_chainName}`, data);
  },
  createBid: (id: string | number, amount: number, quantity: number, currency: string) =>
    axios.post(`/store/bids/make_bid/?network=${localStorage.lessnft_nft_chainName}`, {
      // auth_token: localStorage.dds_token,
      token_id: id,
      amount,
      quantity,
      currency,
    }),
  verificateBet: (id: number) =>
    axios.get(`/store/verificate_bet/${id}/?network=${localStorage.lessnft_nft_chainName}`),
  endAuction: (id: number) =>
    axios.post(`/store/end_auction/${id}/?network=${localStorage.lessnft_nft_chainName}`, {
      token: localStorage.dds_token,
    }),
  putOnSale: (tokenId: number, price?: TNullable<number>, selling?: boolean) => {
    const data: any = {
      selling: true,
      price,
    };
    if (!selling) {
      data.minimal_bid = price;
      delete data.price;
    }

    return axios.patch(`/store/${tokenId}/?network=${localStorage.lessnft_nft_chainName}`, data);
  },
  reportPage: (page: string, reportMessage: string, token: string) =>
    axios.post(`/store/report/?network=${localStorage.lessnft_nft_chainName}`, {
      page,
      reportMessage,
      token,
    }),
  support: (email: string, message: string, token: string) =>
    axios.post(`/store/support/?network=${localStorage.lessnft_nft_chainName}`, {
      email,
      message,
      token,
    }),
  trackTransaction: (tx_hash: string, token: string | number, seller_id: string | number) => {
    const data: any = {
      tx_hash,
      token,
      ownership: seller_id,
    };
    if (!seller_id) delete data.ownership;
    return axios.post(
      `/store/track_transaction/?network=${localStorage.lessnft_nft_chainName}`,
      data,
    );
  },
  removeFromSale: (id: string | number, price?: null, minimal_bid?: null) => {
    const data: {
      selling: false;
      price?: null;
      minimal_bid?: null;
    } = {
      selling: false,
    };
    if (price === null) {
      data.price = price;
    }
    if (minimal_bid === null) {
      data.minimal_bid = minimal_bid;
    }
    return axios.patch(`/store/${id}/?network=${localStorage.lessnft_nft_chainName}`, data);
  },
  changePrice: (id: number | string, price: string | number) =>
    axios.patch(`/store/${id}/?network=${localStorage.lessnft_nft_chainName}`, {
      price,
    }),
  getMaxPrice: (currency: string) => axios.get(`/store/max_price/?currency=${currency}`),
  getHotAuction: () => axios.get(`/store/most_bidded/`),
  getCollection: (id: string, page: number) =>
    axios.get(`/store/collection/${id}/${page}/?network=${localStorage.lessnft_nft_chainName}`),
  getRandomToken: () =>
    axios.get(`/store/get_random_token/`, {
      params: {
        network: localStorage.lessnft_nft_chainName,
      },
    }),
  rejectTransaction: (data: any) => axios.post('/store/remove-reject/', data),
};
