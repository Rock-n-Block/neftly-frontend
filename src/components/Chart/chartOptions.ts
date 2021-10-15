import { ChartOptions } from 'chart.js';
import { IChartData } from 'typings';

export const options: ChartOptions = {
  // aspectRatio: 2,
  parsing: {
    xAxisKey: 'time',
    yAxisKey: 'data',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      // backgroundColor: '#393556',
      // cornerRadius: 0,
      // padding: 12,
      // callbacks: {},
      // displayColors: false,
    },
  },
  scales: {
    xAxis: {
      ticks: {
        color: '#FFF',
      },
    },
    yAxis: {
      ticks: {
        color: '#FFF',
        crossAlign: 'far',
        padding: 20,
      },
      grace: '1%',
      grid: {
        display: true,
        offset: false,
        color: '#393556',
        lineWidth: 1,
      },
      title: {
        color: '#FFF',
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      borderWidth: 0,
      hoverRadius: 8,
      hoverBorderWidth: 5,
      hitRadius: 400,
    },
  },
};

export const defaultChartData: IChartData = {
  datasets: [
    {
      data: [{ time: '1', data: '0' }],
      fill: false,
      backgroundColor: 'transparent',
      borderColor: '#C379F6',
      borderWidth: 4,
      pointBackgroundColor: '#FF72D2',
      pointBorderColor: '#FF72D2',
      cubicInterpolationMode: 'monotone',
      tension: 1,
    },
  ],
};
