export type TPriceHistoryPeriod = 'day' | 'week' | 'month' | 'year';

export type TPriceHistoryItem = {
  id: number | string;
  price: string;
  date: Date;
  amount: number;
  currency: string;
};

export interface IBackendPriceHistory {
  price_history: TPriceHistoryItem[];
  bids_history: TPriceHistoryItem[];
}
