import { useCallback, useEffect, useState } from 'react';
import { activityApi } from 'services';
import { TPriceHistoryItem, TPriceHistoryPeriod } from 'typings';

interface IInitialProps {
  id: string;
  period: TPriceHistoryPeriod;
}

const useFetchPriceHistory = ({ id, period }: IInitialProps) => {
  const [priceHistory, setPriceHistory] = useState<TPriceHistoryItem[]>([]);

  const getPriceHistory = useCallback(() => {
    activityApi.getPriceHistory(id, period).then(({ data }) => {
      setPriceHistory(data);
    });
  }, [id, period]);

  useEffect(() => {
    getPriceHistory();
  }, [getPriceHistory]);

  return { priceHistory };
};

export default useFetchPriceHistory;
