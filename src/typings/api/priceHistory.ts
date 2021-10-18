import { ChartDataset } from 'chart.js';
import { TNullable } from 'typings';

export type TPriceHistoryPeriod = 'day' | 'week' | 'month' | 'year';

export type TPriceHistoryItem = {
  date: Date;
  avg_price: TNullable<number>;
};

export interface IChartData {
  labels: any[];
  datasets: ChartDataset<any, any>;
}

export type IBackendPriceHistory = TPriceHistoryItem[];
