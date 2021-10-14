import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TPriceHistoryItem, TPriceHistoryPeriod } from 'typings';
import moment from 'moment';
import MemoLine from './MemoLine';
import { options } from './chartOptions';
import styles from './Chart.module.scss';
import { Text } from 'components';
import BigNumber from 'bignumber.js/bignumber';

const defaultChartData = {
  datasets: [
    {
      data: [{ time: '1', data: '0' }],
      fill: false,
      backgroundColor: 'transparent',
      borderColor: '#C379F6',
      borderWidth: 3,
      pointBackgroundColor: '#FF72D2',
      pointBorderColor: '#FF72D2',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    },
  ],
};

type Props = {
  data: TPriceHistoryItem[];
  period: TPriceHistoryPeriod;
  className?: string;
};

const ChartComponent: FC<Props> = (props) => {
  const { data, period, className } = props;

  const [delta, setDelta] = useState('0');
  const [selectedPointPrice, setSelectedPointPrice] = useState('');

  const formatDate = useCallback(
    (date: Date) => {
      switch (period) {
        case 'day':
          return moment(date).format('HH:mm');
        case 'week':
          return moment('D/HH');
        case 'month':
          return moment('DD MMM YYYY');
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
        data: new BigNumber(point.price).toFixed(6),
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
    console.log(element);
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

  const getDelta = useCallback(() => {
    if (chartData.datasets[0].data.length < 2) {
      setDelta('-100');
      return;
    }
    const prevLastElPrice = chartData.datasets[0].data[chartData.datasets[0].data.length - 2].data;
    let selectedElPrice = prevLastElPrice;
    if (selectedPointPrice) {
      selectedElPrice = selectedPointPrice;
    } else {
      setSelectedPointPrice(prevLastElPrice);
    }
    const lastElPrice = chartData.datasets[0].data[chartData.datasets[0].data.length - 1].data;
    const absoluteDelta = new BigNumber(lastElPrice).minus(selectedElPrice);
    const onePercent = new BigNumber(lastElPrice).dividedBy(100);
    const percentDelta = new BigNumber(absoluteDelta)
      .dividedBy(onePercent)
      .multipliedBy(-1)
      .toFixed(2);
    setDelta(percentDelta);
  }, [chartData.datasets, selectedPointPrice]);

  const isDeltaPositive = useMemo(() => {
    return new BigNumber(delta).isGreaterThan(0);
  }, [delta]);

  useEffect(() => {
    getDelta();
  }, [getDelta]);

  return (
    <>
      <div className={styles.chartInfo}>
        <Text color="gray" size="m" className={styles.averagePrice}>
          Price
        </Text>
        <Text size="xxl" weight="bold" className={styles.averageValue}>
          {selectedPointPrice} {data[0]?.currency.toUpperCase()}
          <Text tag="span" color={isDeltaPositive ? 'secondary' : 'red'} weight="medium">
            {isDeltaPositive ? `+${delta}` : delta}% than now
          </Text>
        </Text>
      </div>
      <div className={className}>
        <MemoLine data={chartData as any} options={options} getElementAtEvent={getElementAtEvent} />
      </div>
    </>
  );
};

export default ChartComponent;
