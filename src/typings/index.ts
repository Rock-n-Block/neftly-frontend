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

export interface IHistoryOwner {
  avatar: string;
  address: string;
  bio?: string;
  created_at: string;
  custom_url: string;
  display_name: string;
  facebook?: TNullable<string>;
  id: string;
  instagram?: TNullable<string>;
  is_verificated: boolean;
  site?: TNullable<string>;
  twitter: TNullable<string>
}

export interface IHistoryItem {
  date: string;
  method: string;
  name: string;
  price: TNullable<string>;
  new_owner: TNullable<IHistoryOwner>;
  old_owner: TNullable<IHistoryOwner>;
  USD_price: TNullable<string>;
  amount: TNullable<string>;
  currency: ICurrency;
}

export interface ICurrency {
  image: string;
  name: string;
  rate: string;
  symbol: string;
}

export interface IBaseInfo {
  is_verificated: TOptionable<boolean>;
  address: string;
  avatar: string;
  id: number;
  name: string;
}

export interface IBidder {
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
  details: TNullable<any>;
  highest_bid: TNullable<IBidder>;
  highest_bid_USD: TNullable<string | number>;
  history: IHistoryItem[];
  id: number;
  internal_id: number;
  is_auc_selling: boolean;
  is_liked: boolean;
  is_selling: boolean;
  like_count: number;
  media: string;
  minimal_bid: TNullable<string>;
  name: string;
  owner_auction: any[];
  owners: IOwner | IOwner[];
  price: number;
  royalty: number;
  sellers: IOwner[];
  selling: boolean;
  service_fee: any;
  standart: 'ERC721' | 'ERC1155';
  tags: ITag[];
  total_supply: number;
  updated_at: number;
  format: string;
  animation: string;
  network: {
    name: string;
    native_symbol: string;
  };
  currency_service_fee: number;
  views: number;
}

export interface ITag {
  media: string;
  value: string;
}

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;
