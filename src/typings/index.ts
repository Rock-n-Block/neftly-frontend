export * from './UserInfo';
export * from './components';
export * from './hooks';
export * from './connect';

export type ArtistType = {
  id?: number | string;
  avatar: string;
  name: string;
  artsNumber: number;
  amount: number;
  asset: string;
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

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
}

export interface INft {
  USD_price: number;
  available: number;
  bids: any[];
  collection: IBaseInfo;
  creator: IBaseInfo;
  currency: ICurrency;
  description: string;
  details: null | any;
  highest_bid: null | any;
  highest_bid_USD: null | any;
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
  sellers: any[];
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
}
