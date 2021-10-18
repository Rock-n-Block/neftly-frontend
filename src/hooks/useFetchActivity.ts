import { useCallback, useEffect, useState } from 'react';
import { activityApi } from 'services';

export const useFetchActivity = (setLoading: (value: boolean) => void) => {
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const fetchActivity = () => {
    const refresh = page === 1;
    setLoading(true);
    activityApi
      .getActivity(page, selectedFilters)
      .then(({ data }: any) => {
        setTotalItems(data.total_items);
        if (refresh) {
          setItems(data.items);
        } else {
          setItems((prev: any) => [...prev, ...data.items]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilters = useCallback((values: any) => {
    setSelectedFilters(values);
    setPage(1)
  }, []);

  const handlePage = useCallback(
    (newPage) => {
      setPage(newPage);
    },
    [setPage],
  );

  useEffect(() => {
    fetchActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedFilters.length]);

  return {
    totalItems,
    items,
    selectedFilters,
    handleFilters,
    handlePage,
    page,
  };
};
