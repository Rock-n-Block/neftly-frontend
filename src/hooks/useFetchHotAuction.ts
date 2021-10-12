import { useEffect, useState } from 'react';
import { storeApi } from 'services';

export const useFetchHotAuction = () => {
  const [hotAuction, setHotAuction] = useState({});

  const fetchHotAuction = async () => {
    try {
      const { data } = await storeApi.getHotAuction();
      setHotAuction(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHotAuction();
  }, []);

  return {
    hotAuction,
  };
};
