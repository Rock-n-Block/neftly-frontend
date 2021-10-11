import { useCallback, useEffect, useState } from 'react';
import { allCategory, art } from 'assets/img';
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

const useFilters = (setFiltersLoading: (value: boolean) => void) => {
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
    label: 'Date',
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
      setFiltersLoading(true);
      storeApi
        .getMaxPrice(currency)
        .then(({ data }: any) => {
          handleMaxPrice(data.max_price);
        })
        .finally(() => {
          setFiltersLoading(false);
        });
    },
    [handleMaxPrice, setFiltersLoading],
  );

  const fetchTags = useCallback(async () => {
    setFiltersLoading(true);
    const links = await storeApi.getTags();
    if (links.data.tags.length) {
      setFilterTags(
        [{ title: 'All items', icon: allCategory }].concat(
          links.data.tags.map((tag: string) => ({ title: tag, icon: art })),
        ),
      );
    }
    setFiltersLoading(false);
  }, [setFiltersLoading]);

  const fetchRates = useCallback(() => {
    setFiltersLoading(true);
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
        console.log(err);
      })
      .finally(() => {
        setFiltersLoading(false);
      });
  }, [handleCurrencyFilter, setFiltersLoading]);

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
  }, [orderByFilter, tagsFilter]);

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
  };
};

export default useFilters;
