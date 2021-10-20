import { useEffect, useState, useCallback } from 'react';
import { storeApi } from 'services';

import { INft } from 'typings';

const NUMBER_NFTS_PER_PAGE = 6;

interface IProps {
  page: number;
  sort: string;
  order_by?: string;
  tags?: string;
  max_price?: number;
  currency?: string;
  is_verified?: string;
  on_sale?: boolean;
  creator?: string;
  owner?: string;
  text?: string;
  isCanFetch?: boolean;
}

export const useFetchNft = (props: IProps): [number, number, INft[], boolean] => {
  const {
    page,
    sort,
    order_by,
    tags,
    max_price,
    currency,
    is_verified,
    creator,
    owner,
    on_sale,
    text = '',
    isCanFetch = true,
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<INft[]>([]);

  const fetchSearch = useCallback(() => {
    if (!isCanFetch) {
      return;
    }
    const refresh = page === 1;
    setLoading(true);
    storeApi
      .getSearchResults(
        {
          sort,
          order_by,
          tags,
          max_price,
          currency,
          page,
          is_verified,
          creator,
          on_sale,
          owner,
        },
        text,
      )
      .then(({ data: { items, total_tokens } }: any) => {
        setTotalItems(() => total_tokens);
        if (refresh) {
          setNftCards(items);
        } else {
          setNftCards((prev: INft[]) => [...prev, ...items]);
        }
        if (!items.length && refresh) {
          setNftCards([]);
        }
        setAllPages(Math.ceil(total_tokens / NUMBER_NFTS_PER_PAGE));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    creator,
    currency,
    is_verified,
    max_price,
    on_sale,
    order_by,
    owner,
    page,
    sort,
    tags,
    text,
    isCanFetch,
  ]);

  useEffect(() => {
    fetchSearch();
  }, [
    page,
    sort,
    order_by,
    tags,
    max_price,
    currency,
    is_verified,
    creator,
    on_sale,
    text,
    fetchSearch,
  ]);

  return [allPages, totalItems, nftCards, isLoading];
};
