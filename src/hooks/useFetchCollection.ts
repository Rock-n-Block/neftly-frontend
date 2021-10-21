import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { storeApi } from 'services';
import { TNullable } from 'typings';

export const useFetchCollection = (
  setLoading: (value: boolean) => void,
  page: number,
  collectionId: string,
  activeTab: string,
) => {
  const history = useHistory();
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokens, setTokens] = useState<any>([]);
  const [collection, setCollection] = useState<{
    id: number | string;
    avatar: string;
    name?: string;
    address: string;
    cover: string;
    creator: any;
    tokens: Array<any>;
    description: TNullable<string>;
  }>({
    address: '',
    cover: '',
    id: '',
    avatar: '',
    name: '',
    tokens: [],
    creator: {},
    description: null,
  });

  const fetchSearch = () => {
    let filteredTokens = <any>[]
    const refresh = page === 1;
    setLoading(true);
    storeApi
      .getCollection(collectionId, page)
      .then(({ data }: any) => {
        setCollection(data);
        if (activeTab === 'sale') {
          filteredTokens = [...filteredTokens, ...data.tokens.filter((token: any) => token.selling)]
          setTotalTokens(filteredTokens.length)
        } else {
          filteredTokens = [...filteredTokens,  ...data.tokens]
          setTotalTokens(data.tokens_count);
        }
        if (refresh) {
          setTokens(filteredTokens);
        } else {
          setTokens((prev: any) => [...prev, ...filteredTokens]);
        }
        if (!filteredTokens.length) {
          setTokens([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (collectionId) {
      fetchSearch();
    } else {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, collectionId, history, activeTab]);

  return {
    totalTokens,
    collection,
    tokens,
  };
};
