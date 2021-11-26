import { FC, useMemo, useState } from 'react';
import { Select, Text, Chart, TradingHistory } from 'components';
import styles from './PriceHistory.module.scss';
import { ICurrency, IHistoryItem, OptionType, TPriceHistoryPeriod } from 'typings';
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
  history: IHistoryItem[];
}

const PriceHistory: FC<IProps> = ({ tokenId, currency, history }) => {
  const [currentFilterOption, setCurrentFilterOption] = useState(chartOptionsFilter[0]);
  const { priceHistory } = useFetchPriceHistory({
    id: tokenId,
    period: currentFilterOption.value as TPriceHistoryPeriod,
  });

  const TradingTableHeader = useMemo(() => {
    return [{ Header: 'Event', accessor: 'method' }, { Header: 'Price', accessor: 'price' }, { Header: 'Buyer', accessor: 'name' }]
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.chartWrapper}>
        <div className={styles.chartFilter}>
          <Text size="l">Price History </Text>
          <div className={styles.chartSelect}>
            <Text weight="medium" size="m">Filter Period</Text>
            {/* TODO: разобраться что тут с типами */}
            <Select
              className={styles.chartSelect}
              value={currentFilterOption}
              options={chartOptionsFilter}
              onChange={(value) => setCurrentFilterOption(value as any)}
            />
          </div>
        </div>
        {priceHistory.length && (
          <>
            <Chart
              currency={currency}
              className={styles.chart}
              data={priceHistory}
              period={currentFilterOption.value as TPriceHistoryPeriod}
            />
          </>
        )}
      </div>
      <div className={styles.tradingHistoryWrapper}>
        <TradingHistory
          columns={TradingTableHeader}
          tableData={history}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default PriceHistory;
