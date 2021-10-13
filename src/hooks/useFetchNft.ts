import { useEffect, useState } from 'react';
import { storeApi } from 'services';

const NUMBER_NFTS_PER_PAGE = 6;

interface IProps {
  setLoading: (value: boolean) => void;
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
}

export const useFetchNft = (props: IProps) => {
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
    setLoading,
    on_sale,
    text = '',
  } = props;
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<any>([]);

  const fetchSearch = () => {
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
        // TODO: проверить когда внесут изменения на бэке
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
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, order_by, tags, max_price, currency, is_verified, creator, on_sale, text]);

  return {
    allPages,
    totalItems,
    nftCards,
  };
};
