export * from './UserInfo';
export * from './components';
export * from './hooks';

export type ArtistType = {
  id?: number | string;
  avatar: string;
  name: string;
  artsNumber: number;
  amount: number;
  asset: string;
};
