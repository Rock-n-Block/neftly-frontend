import { useEffect, useState, useCallback } from 'react';
import { storeApi } from 'services';
import { INft } from 'typings';
import { useLoading } from './useLoading';

export const useFetchHotAuction = (isRefetch: boolean) => {
  const { isLoading, setIsLoading } = useLoading();
  const [hotAuction, setHotAuction] = useState<INft[]>([]);

  const fetchHotAuction = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await storeApi.getHotAuction();
      setHotAuction(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    fetchHotAuction();
  }, [fetchHotAuction]);

  useEffect(() => {
    if (isRefetch) {
      fetchHotAuction();
    }
  }, [isRefetch, fetchHotAuction]);

  return {
    isLoading,
    hotAuction,
  };
};
