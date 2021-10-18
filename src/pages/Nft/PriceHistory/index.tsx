import { FC, useState } from 'react';
import { Select, Text, Chart } from 'components';
import styles from './PriceHistory.module.scss';
import { ICurrency, OptionType, TPriceHistoryPeriod } from 'typings';
import { useFetchPriceHistory } from 'hooks';

const chartOptionsFilter: OptionType[] = [
  {
    label: 'Today',
    value: 'day' as TPriceHistoryPeriod,
  },
  {
    label: 'This week',
    value: 'week' as TPriceHistoryPeriod,
  },
  {
    label: 'This Month',
    value: 'month' as TPriceHistoryPeriod,
  },
  {
    label: 'This Year',
    value: 'year' as TPriceHistoryPeriod,
  },
];

interface IProps {
  tokenId: string;
  currency: ICurrency;
}

const PriceHistory: FC<IProps> = ({ tokenId, currency }) => {
  const [currentFilterOption, setCurrentFilterOption] = useState(chartOptionsFilter[0]);
  const { priceHistory } = useFetchPriceHistory({
    id: tokenId,
    period: currentFilterOption.value as TPriceHistoryPeriod,
  });

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartFilter}>
        <Text size="l">Price History </Text>
        <div className={styles.chartSelect}>
          <Text color="lightGray">Filter Period</Text>
          {/* TODO: разобраться что тут с типами */}
          <Select
            className={styles.chartSelect}
            value={currentFilterOption}
            options={chartOptionsFilter}
            onChange={(value) => setCurrentFilterOption(value as any)}
          />
        </div>
      </div>
      <Chart
        currency={currency}
        className={styles.chart}
        data={priceHistory}
        period={currentFilterOption.value as TPriceHistoryPeriod}
      />
    </div>
  );
};

export default PriceHistory;
