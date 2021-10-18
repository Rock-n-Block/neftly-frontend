import { TronStatus } from 'appConstants';

export type TronState = {
  address: string;
  status: TronStatus;
  balance?: number;
};
