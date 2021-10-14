import { ChartOptions } from 'chart.js';

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
      backgroundColor: '#393556',
      cornerRadius: 0,
      padding: 12,
    },
  },
  scales: {
    yAxis: {
      grace: '1%',
      grid: {
        display: true,
        offset: true,
        color: '#393556',
        lineWidth: 1,
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
