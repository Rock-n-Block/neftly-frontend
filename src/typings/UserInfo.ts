export interface IBaseInfo {
  is_verificated: boolean | undefined;
  address: string;
  avatar: string;
  id: number;
  name: string;
}

export interface IExtendedInfo extends Omit<IBaseInfo, 'name'> {
  bio: string | null;
  cover: string | null;
  custom_url: string | null;
  display_name: string | null;
  followers: any[];
  followers_count: number;
  follows: any[];
  follows_count: number;
  instagram: string | null;
  is_verificated: false;
  site: string | null;
  twitter: string | null;
}

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
}
