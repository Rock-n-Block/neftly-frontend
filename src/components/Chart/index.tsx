import { FC, useCallback, useMemo, useState } from 'react';
import { ICurrency, TPriceHistoryItem, TPriceHistoryPeriod } from 'typings';
import moment from 'moment';
import MemoLine from './MemoLine';
import { defaultChartData, options } from './chartOptions';
import styles from './Chart.module.scss';
import { Text } from 'components';
import BigNumber from 'bignumber.js/bignumber';
import { useDifference } from '../../hooks';
// import ReactDOM from 'react-dom';
// import { Chart } from 'chart.js';

type Props = {
  data: TPriceHistoryItem[];
  period: TPriceHistoryPeriod;
  currency: ICurrency;
  className?: string;
};
// const CustomTooltip: FC = (tooltip, chart) => {};
const ChartComponent: FC<Props> = (props) => {
  const { data, period, className, currency } = props;

  // const customTooltipTitle = (tooltipItems: any) => {
  //   console.log('tooltipItems', tooltipItems);
  //   return `${currency?.symbol || 'eth'} ${
  //     tooltipItems[0]?.formattedValue || tooltipItems.formattedValue
  //   }`;
  // };
  // const customTooltipLabel = (tooltipItem: any) => {
  //   console.log('tooltipItems', tooltipItem);
  //   return tooltipItem.label;
  // };

  // const externalTooltip = (context: any) => {
  //   let tooltipEl = document.getElementById('chartjs-tooltip');
  //   // Create element on first render
  //   if (!tooltipEl) {
  //     tooltipEl = document.createElement('div');
  //     tooltipEl.id = 'chartjs-tooltip';
  //     tooltipEl.innerHTML = '<table></table>';
  //     document.body.appendChild(tooltipEl);
  //   }
  //   // Hide if no tooltip
  //   let tooltipModel = context.tooltip;
  //   if (tooltipModel.opacity === 0) {
  //     tooltipEl.style.opacity = '0';
  //     return;
  //   }
  //   // Set caret Position
  //   tooltipEl.classList.remove('above', 'below', 'no-transform');
  //   if (tooltipModel.yAlign) {
  //     tooltipEl.classList.add(tooltipModel.yAlign);
  //   } else {
  //     tooltipEl.classList.add('no-transform');
  //   }
  //   const getBody = (bodyItem: any) => {
  //     return bodyItem.lines;
  //   };
  //   // Set Text
  //   if (tooltipModel.body) {
  //     let titleLines = tooltipModel.title || [];
  //     let bodyLines = tooltipModel.body.map(getBody);
  //
  //     let innerHtml = '<thead>';
  //
  //     titleLines.forEach(function (title) {
  //       innerHtml += '<tr><th>' + title + '</th></tr>';
  //     });
  //     innerHtml += '</thead><tbody>';
  //
  //     bodyLines.forEach(function (body, i) {
  //       var colors = tooltipModel.labelColors[i];
  //       var style = 'background:' + colors.backgroundColor;
  //       style += '; border-color:' + colors.borderColor;
  //       style += '; border-width: 2px';
  //       var span = '<span style="' + style + '"></span>';
  //       innerHtml += '<tr><td>' + span + body + '</td></tr>';
  //     });
  //     innerHtml += '</tbody>';
  //
  //     var tableRoot = tooltipEl.querySelector('table');
  //     tableRoot.innerHTML = innerHtml;
  //   }
  //
  //   var position = context.chart.canvas.getBoundingClientRect();
  //   var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
  //
  //   // Display, position, and set styles for font
  //   tooltipEl.style.opacity = '1';
  //   tooltipEl.style.position = 'absolute';
  //   tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
  //   tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
  //   tooltipEl.style.font = bodyFont.string;
  //   tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  //   tooltipEl.style.pointerEvents = 'none';
  // };

  const [selectedPointPrice, setSelectedPointPrice] = useState('');

  const formatDate = useCallback(
    (date: Date) => {
      switch (period) {
        case 'day':
          return moment(date).format('HH:mm');
        case 'week':
          return moment('ddd');
        case 'month':
          return moment('MMM, D');
        case 'year':
          return moment('MMM');
        default:
          return moment('DD MMM YYYY, HH:mm');
      }
    },
    [period],
  );

  const formatedData = useMemo(() => {
    return data.map((point) => {
      return {
        time: formatDate(point.date),
        data: new BigNumber(point.avg_price || '0').toFixed(6),
      };
    });
  }, [data, formatDate]);

  const chartData = useMemo(() => {
    console.log('formatedData', formatedData);
    const mockData = [
      {
        time: 'Jan',
        data: '0.25',
      },
      {
        time: 'Feb',
        data: '0.23',
      },
      {
        time: 'Mar',
        data: '0.2',
      },
      {
        time: 'Apr',
        data: '0.18',
      },
      {
        time: 'May',
        data: '0.17',
      },
      {
        time: 'Jun',
        data: '0.2',
      },
      {
        time: 'Jul',
        data: '0.35',
      },
      {
        time: 'Aug',
        data: '0.3',
      },
      {
        time: 'Sep',
        data: '0.19',
      },
      {
        time: 'Oct',
        data: '0.18',
      },
      {
        time: 'Nov',
        data: '0.27',
      },
      {
        time: 'Dec',
        data: '0.32',
      },
    ];
    console.log('mockData:', mockData);
    return {
      ...defaultChartData,
      datasets: [{ ...defaultChartData.datasets[0], data: mockData }],
    };
  }, [formatedData]);

  const getElementAtEvent = (element: any[]) => {
    if (!element.length) return;

    const { index } = element[0];
    let chosenPrice = '';
    if (index === chartData.datasets[0].data.length - 1) {
      chosenPrice = chartData.datasets[0].data[index - 1].data;
    } else {
      chosenPrice = chartData.datasets[0].data[index].data;
    }
    setSelectedPointPrice(chosenPrice);
  };

  const { isDifferencePositive, difference } = useDifference({ chartData, selectedPointPrice });

  return (
    <>
      <div className={styles.chartInfo}>
        <Text color="gray" size="m" className={styles.averagePrice}>
          Price
        </Text>
        <Text size="xxl" weight="bold" className={styles.averageValue}>
          {selectedPointPrice} {currency?.symbol.toUpperCase()}
          <Text tag="span" color={isDifferencePositive ? 'secondary' : 'red'} weight="medium">
            {isDifferencePositive ? `+${difference}` : difference}% than now
          </Text>
        </Text>
      </div>
      <div className={className}>
        <MemoLine
          currency={currency}
          data={chartData as any}
          options={options}
          getElementAtEvent={getElementAtEvent}
        />
      </div>
    </>
  );
};

export default ChartComponent;
