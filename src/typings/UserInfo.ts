import { TNullable, TOptionable } from 'typings';

export interface IBaseInfo {
  is_verificated: TOptionable<boolean>;
  address: string;
  avatar: string;
  id: number;
  name: string;
}

export interface IExtendedInfo extends Omit<IBaseInfo, 'name'> {
  bio: TNullable<string>;
  cover: TNullable<string>;
  custom_url: TNullable<string>;
  display_name: TNullable<string>;
  followers: any[];
  followers_count: number;
  follows: any[];
  follows_count: number;
  instagram: TNullable<string>;
  twitter: TNullable<string>;
  facebook: TNullable<string>;
  is_verificated: false;
  site: TNullable<string>;
  created_at: string | Date;
}

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
}

export type IAppliedFilter = {
  label: string;
  value: string;
  field?: string;
};

export type AdvancedFilterType = Record<string, IAppliedFilter>;
