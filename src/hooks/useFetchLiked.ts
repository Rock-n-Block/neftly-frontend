import { useCallback, useEffect, useState } from 'react';
import { storeApi } from 'services';
import { INft } from 'typings';

const NUMBER_NFTS_PER_PAGE = 6;

interface IProps {
  page: number;
  address: string;
  isRefresh: boolean;
}

export const useFetchLiked = (props: IProps): [number, number, INft[], boolean] => {
  const { page, address, isRefresh } = props;
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<INft[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiked = useCallback(() => {
    const refresh = page === 1;
    setIsLoading(true);
    storeApi
      .getLiked(address, page)
      .then(({ data: { items, total_tokens } }) => {
        setTotalItems(total_tokens);
        if (refresh) {
          setNftCards(items);
        } else if (items) {
          setNftCards((prev: INft[]) => [...prev, ...items]);
        }
        if (!items?.length && refresh) {
          setNftCards([]);
        }
        setAllPages(Math.ceil(total_tokens / NUMBER_NFTS_PER_PAGE));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [address, page]);

  useEffect(() => {
    fetchLiked();
  }, [fetchLiked, page, address]);

  useEffect(() => {
    if (isRefresh) {
      fetchLiked();
    }
  }, [fetchLiked, isRefresh]);

  return [allPages, totalItems, nftCards, isLoading];
};
