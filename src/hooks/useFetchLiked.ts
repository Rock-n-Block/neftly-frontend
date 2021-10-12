import { useEffect, useState } from 'react';
import { storeApi } from 'services';

const NUMBER_NFTS_PER_PAGE = 6;

interface IProps {
  setLoading: (value: boolean) => void;
  page: number;
  address: string;
}

export const useFetchLiked = (props: IProps) => {
  const { page, setLoading, address } = props;
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<any>([]);

  const fetchLiked = () => {
    const refresh = page === 1;
    setLoading(true);
    storeApi
      .getLiked(address, page)
      .then(({ data: { items, total_tokens } }: any) => {
        console.log('fetchLiked', items, total_tokens);
        setTotalItems(total_tokens);
        if (refresh) {
          setNftCards(items);
        } else {
          setNftCards([...nftCards, ...items]);
        }
        if (!items.length && refresh) {
          setNftCards([]);
        }
        setAllPages(Math.ceil(total_tokens / NUMBER_NFTS_PER_PAGE));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLiked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, address]);

  return {
    allPages,
    totalItems,
    nftCards,
  };
};
