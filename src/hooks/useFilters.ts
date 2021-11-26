import { useCallback, useEffect, useState } from 'react';
import { useTabs } from 'hooks';
import { ratesApi, storeApi } from 'services';
import { OptionType } from 'typings';

const DEFAULT_FILTER_STATE = {
  type: 'items',
  order_by: '-date',
  tags: 'All NFTs',
  max_price: 0,
  currency: 'All',
  page: 1,
  is_verificated: 'All',
};

const defaultValues = DEFAULT_FILTER_STATE;
export type TDefaultValues = typeof defaultValues;

const useFilters = (filterTag = '') => {
  const [isMaxPriceLoading, setMaxPriceLoading] = useState(false);
  const [isRatesLoading, setRatesLoading] = useState(false);

  const [maxPriceFilter, setMaxPriceFilter] = useState({
    value: DEFAULT_FILTER_STATE.max_price.toString(),
    label: `0 ETH - ${DEFAULT_FILTER_STATE.max_price} ETH`,
    field: 'max_price',
  });
  const [currencyFilter, setCurrencyFilter] = useState({
    value: DEFAULT_FILTER_STATE.currency,
    label: 'All',
    field: 'currency',
  });
  const [likesFilter, setLikesFilter] = useState({
    value: '',
    label: '',
    field: 'likes',
  });
  const [verifiedFilter, setVerifiedFilter] = useState({
    value: DEFAULT_FILTER_STATE.is_verificated,
    label: DEFAULT_FILTER_STATE.is_verificated,
    field: 'is_verificated',
  });
  const [orderByFilter, setOrderByFilter] = useState<OptionType>({
    value: DEFAULT_FILTER_STATE.order_by,
    label: 'Newest',
  });
  const [filterSelectCurrencyOptions, setFilterSelectCurrencyOptions] = useState<any>([]);
  const [tagsFilter, setTagsFilter] = useState(
    filterTag !== '' ? filterTag : DEFAULT_FILTER_STATE.tags,
  );

  const { activeTab } = useTabs([], tagsFilter);

  useEffect(() => {
    setTagsFilter(activeTab);
  }, [setTagsFilter, activeTab]);

  const [page, setPage] = useState(DEFAULT_FILTER_STATE.page);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_FILTER_STATE.max_price);

  const handleMaxPriceFilter = useCallback((value: number) => {
    setMaxPriceFilter((prev) => ({
      ...prev,
      value: value.toString(),
      label: `0 ETH - ${value} ETH`,
    }));
  }, []);

  const handleCurrencyFilter = useCallback((value: OptionType) => {
    setCurrencyFilter((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  const handleLikesFilter = useCallback((value: OptionType) => {
    setLikesFilter((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  const handleVerifiedFilter = useCallback((value: OptionType) => {
    setVerifiedFilter((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  const handleTagsFilter = useCallback((value: string) => {
    setTagsFilter(value);
  }, []);

  const handleOrderByFilter = useCallback((value: OptionType) => {
    setPage(1);
    setOrderByFilter(value);
  }, []);

  const handlePage = useCallback((value: number) => {
    setPage(value);
  }, []);

  const handleMaxPrice = useCallback((value: number) => {
    setMaxPrice(value);
  }, []);

  const resetFilter = useCallback(
    (key?: string) => {
      switch (key) {
        case 'max_price': {
          handleMaxPriceFilter(maxPrice);
          break;
        }
        case 'currency': {
          handleCurrencyFilter({
            value: DEFAULT_FILTER_STATE.currency,
            label: 'All',
          });
          break;
        }
        case 'is_verificated': {
          handleVerifiedFilter({
            value: DEFAULT_FILTER_STATE.is_verificated,
            label: DEFAULT_FILTER_STATE.is_verificated,
          });
          break;
        }
        default: {
          handleMaxPriceFilter(maxPrice);
          handleCurrencyFilter({
            value: DEFAULT_FILTER_STATE.currency,
            label: 'All',
          });
          handleVerifiedFilter({
            value: DEFAULT_FILTER_STATE.is_verificated,
            label: DEFAULT_FILTER_STATE.is_verificated,
          });
        }
      }
    },
    [handleVerifiedFilter, handleMaxPriceFilter, handleCurrencyFilter, maxPrice],
  );

  const fetchMaxPrice = useCallback(
    (currency: string) => {
      setMaxPriceLoading(true);
      storeApi
        .getMaxPrice(currency)
        .then(({ data }: any) => {
          handleMaxPrice(data.max_price);
          handleMaxPriceFilter(data.max_price);
        })
        .finally(() => {
          setMaxPriceLoading(false);
        });
    },
    [handleMaxPrice, setMaxPriceLoading, handleMaxPriceFilter],
  );

  const fetchRates = useCallback(() => {
    setRatesLoading(true);
    ratesApi
      .getRates()
      .then(({ data }: any) => {
        setFilterSelectCurrencyOptions([
          { value: 'All', label: 'All' },
          ...data.map((currency: any) => ({
            value: currency.symbol,
            label: currency.symbol.toUpperCase(),
          })),
        ]);
        handleCurrencyFilter({ value: 'All', label: 'All' });
      })
      .catch((err: Error) => {
        console.error(err);
      })
      .finally(() => {
        setRatesLoading(false);
      });
  }, [handleCurrencyFilter, setRatesLoading]);

  // const isLoading = useMemo(() => {
  //   if(awaitUntilAllLoaded) {
  //     return isMaxPriceLoading ||
  //   }
  // }, [])

  // TODO: stop to fetch if this filters don't used
  useEffect(() => {
    fetchMaxPrice(currencyFilter.value);
  }, [currencyFilter, fetchMaxPrice]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    setPage(1);
  }, [orderByFilter, tagsFilter, currencyFilter, verifiedFilter, maxPriceFilter]);

  return {
    defaultValues,
    maxPrice,
    maxPriceFilter,
    handleMaxPriceFilter,
    currencyFilter,
    handleCurrencyFilter,
    likesFilter,
    handleLikesFilter,
    verifiedFilter,
    handleVerifiedFilter,
    orderByFilter,
    handleOrderByFilter,
    filterSelectCurrencyOptions,
    tagsFilter,
    handleTagsFilter,
    page,
    handlePage,
    resetFilter,
    isLoading: isMaxPriceLoading || isRatesLoading,
  };
};

export default useFilters;
