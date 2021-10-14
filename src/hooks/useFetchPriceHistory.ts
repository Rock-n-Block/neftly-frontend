import { useCallback, useEffect, useState } from 'react';
import { activityApi } from '../services';
import { TPriceHistoryItem, TPriceHistoryPeriod } from 'typings';
import BigNumber from 'bignumber.js/bignumber';

interface IInitialProps {
  id: string;
  period: TPriceHistoryPeriod;
}

const useFetchPriceHistory = (props: IInitialProps) => {
  const { id, period } = props;
  const [priceHistory, setPriceHistory] = useState<TPriceHistoryItem[]>([]);
  const [averagePrice, setAveragePrice] = useState('0');

  const getPriceHistory = useCallback(() => {
    activityApi.getPriceHistory(id, period).then(({ data }) => {
      const { price_history, bids_history } = data;
      if (price_history.length) {
        setPriceHistory(price_history);
      } else {
        setPriceHistory(bids_history);
      }
      // setBidHistory(bids_history);
    });
  }, [id, period]);
  // TODO: удалить, если avg price не используется
  const getAveragePrice = useCallback((): void => {
    if (priceHistory.length) {
      setAveragePrice('0');
      return;
    }
    const sum = priceHistory.reduce(
      (summarizer, { price }) => new BigNumber(summarizer).plus(price),
      new BigNumber(0),
    );
    const average = new BigNumber(sum).dividedBy(priceHistory.length).toFixed(6);
    setAveragePrice(average);
  }, [priceHistory]);

  useEffect(() => {
    getPriceHistory();
  }, [getPriceHistory]);
  useEffect(() => {
    getAveragePrice();
  }, [getAveragePrice]);

  return { priceHistory, averagePrice };
};

export default useFetchPriceHistory;
