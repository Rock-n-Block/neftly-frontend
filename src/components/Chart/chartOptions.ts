import { ChartOptions } from 'chart.js';
import { IChartData } from 'typings';

const fontStyle = {
  size: 16,
  family: 'Epilogue',
};

export const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  parsing: {
    xAxisKey: 'time',
    yAxisKey: 'data'
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    xAxis: {
      ticks: {
        color: '#080134',
        font: fontStyle,
      },
      grid: {
        display: false,

      }
    },
    yAxis: {
      min: 0,
      ticks: {
        color: '#080134',
        crossAlign: 'far',
        font: fontStyle,
      },
      grace: '1%',
      grid: {
        display: true,
        offset: false,
        color: '#CECCD6',
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
  labels: [],
  datasets: [
    {
      data: [{ time: 1, data: 2 }],
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
