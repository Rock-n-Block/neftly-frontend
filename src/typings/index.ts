export * from './UserInfo';
export * from './components';
export * from './hooks';
export * from './connect';
export * from './api';

export type ArtistType = {
  id?: number | string;
  avatar: string;
  name: string;
  artsNumber?: number;
  amount: number;
  asset?: string;
};

export interface IHistoryItem {
  avatar: string;
  date: string;
  id: number;
  method: string;
  name: string;
  price: null | string;
}

export interface ICurrency {
  image: string;
  name: string;
  rate: string;
  symbol: string;
}

export interface IBaseInfo {
  is_verificated: boolean | undefined;
  address: string;
  avatar: string;
  id: number;
  name: string;
}

interface IBidder {
  amount: string | number;
  bidder: string;
  bidder_avatar: string;
  bidder_id: number | string;
  currency: ICurrency;
  id: number | string;
}

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
  currency: ICurrency;
}

export interface INft {
  USD_price: number;
  available: number;
  bids: IBidder[];
  collection: IBaseInfo;
  creator: IBaseInfo;
  currency: ICurrency;
  description: string;
  details: null | any;
  highest_bid: null | IBidder;
  highest_bid_USD: null | number | string;
  history: IHistoryItem[];
  id: number;
  internal_id: number;
  is_auc_selling: boolean;
  is_liked: boolean;
  is_selling: boolean;
  like_count: number;
  media: string;
  minimal_bid: string | null;
  name: string;
  owner_auction: any[];
  owners: IOwner | IOwner[];
  price: number;
  royalty: number;
  sellers: IOwner[];
  selling: boolean;
  service_fee: any;
  standart: 'ERC721' | 'ERC1155';
  tags: any[];
  total_supply: number;
  updated_at: number;
  format: string;
  animation: string;
  network: {
    name: string;
    native_symbol: string;
  };
  currency_service_fee: number;
}
