import { useCallback, useEffect, useState } from 'react';
import { allCategory } from 'assets/img';
import { ratesApi, storeApi } from 'services';
import { OptionType } from 'typings';

const DEFAULT_FILTER_STATE = {
  type: 'items',
  order_by: '-date',
  tags: 'All items',
  max_price: 0,
  currency: '',
  page: 1,
  is_verificated: 'All',
};

const useFilters = () => {
  const [isMaxPriceLoading, setMaxPriceLoading] = useState(false);
  const [isTagsLoading, setTagsLoading] = useState(false);
  const [isRatesLoading, setRatesLoading] = useState(false);
  const [filterTags, setFilterTags] = useState<any>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState(DEFAULT_FILTER_STATE.max_price);
  const [currencyFilter, setCurrencyFilter] = useState<OptionType>({
    value: DEFAULT_FILTER_STATE.currency,
    label: '',
  });
  const [likesFilter, setLikesFilter] = useState<OptionType>({
    value: '',
    label: '',
  });
  const [verifiedFilter, setVerifiedFilter] = useState<OptionType>({
    value: DEFAULT_FILTER_STATE.is_verificated,
    label: DEFAULT_FILTER_STATE.is_verificated,
  });
  const [orderByFilter, setOrderByFilter] = useState<OptionType>({
    value: DEFAULT_FILTER_STATE.order_by,
    label: 'Newest',
  });
  const [filterSelectCurrencyOptions, setFilterSelectCurrencyOptions] = useState<any>([]);
  const [tagsFilter, setTagsFilter] = useState(DEFAULT_FILTER_STATE.tags);
  const [page, setPage] = useState(DEFAULT_FILTER_STATE.page);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_FILTER_STATE.max_price);

  const handleMaxPriceFilter = useCallback((value: number) => {
    setMaxPriceFilter(value);
  }, []);

  const handleCurrencyFilter = useCallback((value: OptionType) => {
    setCurrencyFilter(value);
  }, []);

  const handleLikesFilter = useCallback((value: OptionType) => {
    setLikesFilter(value);
  }, []);

  const handleVerifiedFilter = useCallback((value: OptionType) => {
    setVerifiedFilter(value);
  }, []);

  const handleTagsFilter = useCallback((value: string) => {
    setTagsFilter(value);
  }, []);

  const handleOrderByFilter = useCallback((value: OptionType) => {
    setOrderByFilter(value);
  }, []);

  const handlePage = useCallback((value: number) => {
    setPage(value);
  }, []);

  const handleMaxPrice = useCallback((value: number) => {
    setMaxPrice(value);
  }, []);

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

  const fetchTags = useCallback(async () => {
    try {
      setTagsLoading(true);
      const links = await storeApi.getTags();
      if (links.data.tags.length) {
        setFilterTags(
          [{ title: 'All items', icon: allCategory }].concat(
            links.data.tags.map((tag: { title: string; icon: string }) => ({
              title: tag.title,
              key: tag.title,
              icon: tag.icon,
            })),
          ),
        );
      }
      setTagsLoading(false);
    } catch (error) {
      setTagsLoading(false);
    }
  }, []);

  const fetchRates = useCallback(() => {
    setRatesLoading(true);
    ratesApi
      .getRates()
      .then(({ data }: any) => {
        setFilterSelectCurrencyOptions(
          data.map((currency: any) => ({
            value: currency.symbol,
            label: currency.symbol.toUpperCase(),
          })),
        );
        handleCurrencyFilter({ value: data[0].symbol, label: data[0].symbol.toUpperCase() });
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
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    setPage(1);
  }, [orderByFilter, tagsFilter, currencyFilter, verifiedFilter, maxPriceFilter]);

  return {
    filterTags,
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
    isLoading: isMaxPriceLoading || isTagsLoading || isRatesLoading,
  };
};

export default useFilters;
