import { ChartDataset } from 'chart.js';

export type TPriceHistoryPeriod = 'day' | 'week' | 'month' | 'year';

export type TPriceHistoryItem = {
  date: Date;
  avg_price: number | null;
};

export interface IChartData {
  datasets: ChartDataset<any, any>;
}

export type IBackendPriceHistory = TPriceHistoryItem[];
