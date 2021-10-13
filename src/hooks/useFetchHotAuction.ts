import { useEffect, useState } from 'react';
import { storeApi } from 'services';
import { THotAuctionRes } from 'typings';
import { useLoading } from './useLoading';

export const useFetchHotAuction = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [hotAuction, setHotAuction] = useState<THotAuctionRes>([]);

  const fetchHotAuction = async () => {
    setIsLoading(true);
    try {
      const { data } = await storeApi.getHotAuction();
      setHotAuction(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotAuction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    hotAuction,
  };
};
