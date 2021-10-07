import axios from '../../core/axios';

export default {
  burnToken: (id: string, amount?: string) => axios.post(`store/${id}/burn/`, { amount }),
  createToken: (data: any) => axios.post('store/create_token/', data),
  // createToken: (data: any, details: any) => {
  //   data.details = details;
  //   return axios.post('store/create_token/', data);
  // },
  createCollection: (data: any) => axios.post('store/create_collection/', data),
  saveToken: (data: any) => axios.post('store/save_token/', data),
  saveCollection: (data: any) => axios.post('store/save_collection/', data),
  transferToken: (id: string, address: string, amount?: string) => {
    const data = { address, amount };
    if (!amount) delete data.amount;
    return axios.post(`store/transfer/${id}/`, data);
  },
  // saveCollection: (data: any, tx_hash: string) => axios.post(`store/save_collection/${tx_hash}`, data),
  getExplore: (page: number, filter: string, sort: string) =>
    axios.get(`store/hot/${page}/?sort=${sort}${filter !== 'all' ? `&tag=${filter}` : ''}`),
  getTags: () => axios.get(`store/tags/?nerwork=${localStorage.netfly_nft_chainName}`),
  getFavorites: () => axios.get(`store/favorites/`),
  getCollections: () => axios.get('store/hot_collections/'),
  getHotBids: () => axios.get('store/hot_bids/'),
  getCollectionById: (id: number | string, page: number) =>
    axios.get(`store/collection/${id}/${page}/`),
  getToken: (id: number | string) => axios.get(`store/${id}/`),
  buyToken: (id: number | string, amount: number, sellerId?: string | number) => {
    const data: any = {
      id,
      tokenAmount: amount,
    };
    if (sellerId) data.sellerId = sellerId;
    return axios.post(`/store/buy/`, data);
  },
  getLiked: (address: string, page: number) => axios.get(`store/liked/${address}/${page}/`),
  getCreated: (address: string, page: number) => axios.get(`store/created/${address}/${page}/`),
  getCollectibles: (address: string, page: string) => axios.get(`store/owned/${address}/${page}/`),
  getUserCollections: (address: string, page: number) =>
    axios.get(`store/collections/${address}/${page}/`),
  getSearchResults: (queries: any) => {
    const queriesCopy = { ...queries, max_price: queries.max_price[0] };
    switch (queriesCopy.is_verificated) {
      case 'All':
        delete queriesCopy.is_verificated;
        break;
      case 'verified':
        queriesCopy.is_verificated = 'true';
        break;
      case 'unverified':
        queriesCopy.is_verificated = 'false';
        break;
      default:
        break;
    }
    if (!queriesCopy.on_sale) {
      delete queriesCopy.on_sale;
    }
    if (queriesCopy.tags === 'All items') delete queriesCopy.tags;
    let query = `?network=${localStorage.netfly_nft_chainName}&on_sale=true&`;
    Object.keys(queriesCopy).forEach((key, index) => {
      if (queriesCopy[key] || queriesCopy[key] === false || queriesCopy[key] === 0) {
        query = query.concat(
          `${key}=${queriesCopy[key]}${index === Object.keys(queriesCopy).length - 1 ? '' : '&'}`,
        );
      }
    });
    return axios.post(
      `/store/search/${
        query === `?network=${localStorage.netfly_nft_chainName}&on_sale=true&`
          ? `?network=${localStorage.netfly_nft_chainName}&on_sale=true`
          : query
      }`,
      {
        text: '',
      },
    );
  },
  getFee: () => axios.get('/store/fee/'),
  setCollectionCover: (file: any, id: string) => {
    const data = new FormData();
    data.append('id', id);
    data.append('auth_token', localStorage.dds_token);
    data.append('cover', file);
    return axios.post('/store/set_cover/', data);
  },
  createBid: (id: string | number, amount: number, quantity: number, currency: string) =>
    axios.post('/store/bids/make_bid/', {
      // auth_token: localStorage.dds_token,
      token_id: id,
      amount,
      quantity,
      currency,
    }),
  verificateBet: (id: number) => axios.get(`/store/verificate_bet/${id}/`),
  endAuction: (id: number) =>
    axios.post(`/store/end_auction/${id}/`, {
      token: localStorage.dds_token,
    }),
  putOnSale: (tokenId: number, price?: number | null, selling?: boolean) => {
    const data: any = {
      selling: true,
      price,
    };
    if (!selling) {
      data.minimal_bid = price;
      delete data.price;
    }

    return axios.patch(`/store/${tokenId}/`, data);
  },
  reportPage: (page: string, reportMessage: string, token: string) =>
    axios.post('/store/report/', { page, reportMessage, token }),
  support: (email: string, message: string, token: string) =>
    axios.post('/store/support/', { email, message, token }),
  trackTransaction: (tx_hash: string, token: string | number, seller_id: string | number) => {
    const data: any = {
      tx_hash,
      token,
      ownership: seller_id,
    };
    if (!seller_id) delete data.ownership;
    return axios.post('/store/track_transaction/', data);
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
    return axios.patch(`/store/${id}/`, data);
  },
  getMaxPrice: (currency: string) => axios.get(`/store/max_price/?currency=${currency}`),
};
