import { FC, useCallback, useMemo, useState } from 'react';
import { ICurrency, TPriceHistoryItem, TPriceHistoryPeriod } from 'typings';
import moment from 'moment';
import LineWrapper from './LineWrapper';
import { defaultChartData, options } from './chartOptions';
import styles from './Chart.module.scss';
import { Text } from 'components';
import BigNumber from 'bignumber.js/bignumber';
import { useDifference } from 'hooks';

type Props = {
  data: TPriceHistoryItem[];
  period: TPriceHistoryPeriod;
  currency: ICurrency;
  className?: string;
};

const ChartComponent: FC<Props> = (props) => {
  const { data, period, className, currency } = props;

  const [selectedPointPrice, setSelectedPointPrice] = useState(
    `${data[data.length - 2]?.avg_price || 0}`,
  );
  const lastPointPrice = `${data[data.length - 1]?.avg_price || 0}`;

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
        data: new BigNumber(point?.avg_price || '0').toFixed(6),
      };
    });
  }, [data, formatDate]);

  const chartData = useMemo(() => {
    return {
      ...defaultChartData,
      datasets: [{ ...defaultChartData.datasets[0], data: formatedData }],
    };
  }, [formatedData]);

  const getElementAtEvent = (element: any[]) => {
    if (!element.length) return;

    const { index } = element[0];
    const chosenPrice = chartData.datasets[0].data[index].data;
    setSelectedPointPrice(chosenPrice);
  };

  const { isDifferencePositive, difference } = useDifference({
    value: lastPointPrice,
    prevValue: selectedPointPrice,
  });

  return (
    <>
      <div className={styles.chartInfo}>
        <Text color="gray" size="m" className={styles.averagePrice}>
          Avg. Price
        </Text>
        <Text size="xxl" weight="bold" className={styles.averageValue}>
          {+selectedPointPrice || lastPointPrice} {currency?.symbol.toUpperCase()}
          <Text tag="span" color={isDifferencePositive ? 'secondary' : 'red'} weight="medium">
            {isDifferencePositive ? `+${difference}` : difference}% than now
          </Text>
        </Text>
      </div>
      <LineWrapper
        className={className}
        currency={currency}
        data={chartData as any}
        options={options}
        getElementAtEvent={getElementAtEvent}
      />
    </>
  );
};

export default ChartComponent;
