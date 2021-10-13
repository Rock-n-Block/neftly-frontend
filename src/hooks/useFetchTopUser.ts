import { useEffect, useState } from 'react';
import { activityApi } from 'services';
import { TTopUserRes } from 'typings';

export const useFetchTopUsers = (
  type = 'seller',
  sortPeriod = 'day',  
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [topUser, setTopUser] = useState<TTopUserRes>([]);

  const fetchTopUsers = () => {
    setIsLoading(true);
    activityApi
      .getTopUsers({
        type,
        sortPeriod,
      })
      .then(({ data }) => {
        setTopUser(data)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
      fetchTopUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, sortPeriod]);

  return {
    isLoading,
    topUser,
  };
};
