export type TCurrency = {
  rate: string;
  symbol: string;
  name: string;
  image: string;
};

type BaseOwnerAndCreator = {
  avatar: string;
  created_at: string;
  twitter: string;
  instagram: string;
  facebook: string;
  site: string;
  created_tokens: number;
  id: number;
  name: string;
};

export type TOwner = BaseOwnerAndCreator & {
  quantity: number;
  price: number;
  currency: TCurrency;
};

export type TCreator = BaseOwnerAndCreator & {
  address: string;
  is_verificated: false;
};

export type TCollection = {
  avatar: string;
  id: string;
  name: string;
  address: string;
};

export type THistoryElement = {
  id: number;
  name: string;
  avatar: string;
  method: string;
  date: string;
  price: null | string;
};

export type THotAuctionRes = {
  is_selling: boolean;
  is_auc_selling: boolean;
  is_timed_auc_selling: null | string;
  like_count: number;
  tags: any[];
  id: number;
  name: string;
  media: string;
  animation: null | string;
  total_supply: number;
  available: number;
  price: number;
  currency: TCurrency;
  USD_price: number;
  owners: TOwner;
  standart: string;
  creator: TCreator;
  collection: TCollection;
  minimal_bid: null | string;
  description: null | string;
  details: null | string;
  royalty: string;
  is_liked: false;
  selling: true;
  updated_at: string;
  start_auction: null | string;
  end_auction: null | string;
  format: string;
  digital_key: null | string;
  bids: any[];
  highest_bid: null | string;
  highest_bid_USD: null | string;
  network: {
    name: string;
    native_symbol: string;
  };
  history: THistoryElement[];
  sellers: any[];
  service_fee: number;
  currency_service_fee: number;
  USD_service_fee: number;
  internal_id: number;
  owner_auction: any[];
};
