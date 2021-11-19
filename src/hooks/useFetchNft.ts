import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { storeApi } from 'services';
import { INft } from 'typings';

const NUMBER_NFTS_PER_PAGE = 8;

interface IProps {
  page?: number;
  sort?: string;
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
  isOnlyForOwnerOrCreator?: boolean;
}

export const useFetchNft = (
  props: IProps,
  isDebounce = false,
): [number, number, INft[], boolean, (textValue: string) => void] => {
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
    isOnlyForOwnerOrCreator,
  } = props;
  const [isLoading, setLoading] = useState(false);
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nftCards, setNftCards] = useState<INft[]>([]);

  const fetchSearch = useCallback(
    (textInput = text) => {
      if (!isCanFetch || (isOnlyForOwnerOrCreator && !owner && !creator)) {
        return;
      }
      const refresh = page === 1;
      setLoading(true);

      let boolIsVerified = false;
      switch (is_verified) {
        case 'verified':
          boolIsVerified = true;
          break;
        case 'unverified':
          boolIsVerified = false;
          break;
        default:
          break;
      }
      const formattedTags = tags === 'All NFTs' ? undefined : tags;

      storeApi
        .getSearchResults({
          sort,
          order_by,
          tags: formattedTags,
          max_price,
          currency,
          page,
          is_verified: boolIsVerified,
          creator,
          on_sale,
          owner,
          text: textInput,
        })
        .then(({ data: { items, total_tokens } }: any) => {
          setTotalItems(() => total_tokens);
          if (refresh) {
            setNftCards(items);
          } else {
            setNftCards((prev: INft[]) => [...prev, ...items]);
          }
          if (!items && refresh) {
            setNftCards([]);
          }
          setAllPages(Math.ceil(total_tokens / NUMBER_NFTS_PER_PAGE));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [
      creator,
      currency,
      isCanFetch,
      isOnlyForOwnerOrCreator,
      is_verified,
      max_price,
      on_sale,
      order_by,
      owner,
      page,
      sort,
      tags,
      text,
    ],
  );

  const debouncedFetch = useRef(
    debounce((value) => {
      if (value !== '') {
        return fetchSearch(value);
      }
      setTotalItems(0);
      setNftCards([]);
      return () => {};
    }, 1000),
  ).current;

  useEffect(() => {
    if (!isDebounce) {
      fetchSearch();
    }
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
    isDebounce,
    fetchSearch,
  ]);

  return [allPages, totalItems, nftCards, isLoading, debouncedFetch];
};
