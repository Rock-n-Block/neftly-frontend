import { ChartDataset } from 'chart.js';

export type TPriceHistoryPeriod = 'day' | 'week' | 'month' | 'year';

export type TPriceHistoryItem = {
  date: Date;
  avg_price: number | null;
};

export interface IChartData {
  labels: any[];
  datasets: ChartDataset<any, any>;
}

export type IBackendPriceHistory = TPriceHistoryItem[];
