import { useEffect, useState } from 'react';
import { storeApi } from 'services';

const NUMBER_NFTS_PER_PAGE = 6;

export const useFetchNft = (
  setLoading: (value: boolean) => void,
  page: number,
  type: string,
  order_by: string,
  tags: string,
  max_price: number,
  currency: string,
  is_verificated: string,
) => {
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [bids, setBids] = useState<any>([]);

  const fetchSearch = () => {
    const refresh = page === 1;
    setLoading(true);
    storeApi
      .getSearchResults({
        type,
        order_by,
        tags,
        max_price,
        currency,
        page,
        is_verificated,
      })
      .then(({ data }: any) => {
        setTotalItems(data.total_tokens);
        if (refresh) {
          setBids(data.items);
        } else {
          setBids((prev: any) => {
            console.log('prev', prev, 'data.items', data.items, 'combined', [
              ...prev,
              ...data.items,
            ]);
            return [...prev, ...data.items];
          });
        }
        setAllPages(Math.ceil(data.total_tokens / NUMBER_NFTS_PER_PAGE));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type, order_by, tags, max_price, currency, is_verificated]);

  return {
    allPages,
    totalItems,
    bids,
  }
};
