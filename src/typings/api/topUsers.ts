import { TNullable } from 'typings';

type TUser = {
  address: string;
  avatar: string;
  bio: string;
  created_at: string;
  custom_url: TNullable<string>;
  display_name: string;
  facebook: string;
  id: number;
  instagram: string;
  is_verificated: boolean;
  site: string;
  twitter: string;
  owned_tokens: number;
  created_tokens: number;
};

export type TTopUser = {
  id: number;
  price: number;
  user: TUser;
};

export type TTopUserRes = {
  id: number;
  price: number;
  user: TUser;
}[];

export type TTopUserReq = {
  type: string;
  sortPeriod: string;
};
