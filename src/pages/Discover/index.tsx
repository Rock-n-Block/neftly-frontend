import { RefObject, useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilterSVG } from 'assets/img';
import cx from 'classnames';
import {
  ArtCard,
  Button,
  H2,
  H3,
  LiveAuction,
  Loader,
  Modal,
  Select,
  TabLookingComponent,
  Text,
} from 'components';
import { AdvancedFilter } from 'containers';
import { useFetchNft, useFilters, useInfiniteScroll, useScrollDown, useWindowSize } from 'hooks';
import { observer } from 'mobx-react-lite';
import { userApi } from 'services';
import { useMst } from 'store';
import { selectOptions, TNullable } from 'typings';
import { toFixed } from 'utils';

import styles from './styles.module.scss';
import GridLayer, { EGridJustify } from 'containers/GridLayer';

const mobileBreakPoint = 780;

const Discover = observer(() => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const { user, nftTags } = useMst();

  const convertedTagsForComponents = nftTags.tags.map((tag) => {
    return {
      ...tag,
      key: tag.title,
    };
  });

  const { search } = useLocation();
  const filterTag =
    search.includes('tags') || search.includes('filters') ? search.replace(/^(.*?)=/, '') : ' ';
  const textSearch = search.includes('text') ? search.replace(/^(.*?text)=/, '') : '';

  const handleOpenFilter = useCallback(() => {
    setFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const {
    maxPrice,
    maxPriceFilter,
    handleMaxPriceFilter,
    currencyFilter,
    handleCurrencyFilter,
    verifiedFilter,
    handleVerifiedFilter,
    orderByFilter,
    handleOrderByFilter,
    filterSelectCurrencyOptions,
    tagsFilter,
    handleTagsFilter,
    page,
    handlePage,
    isLoading,
    defaultValues,
    resetFilter,
  } = useFilters(filterTag);

  const [allPages, totalItems, nftCards, isNftsLoading] = useFetchNft({
    page,
    sort: 'items',
    order_by: orderByFilter.value,
    tags: (textSearch && ' ') || tagsFilter === 'All NFTs' ? '' : tagsFilter,
    max_price: +maxPriceFilter.value,
    currency: currencyFilter.value,
    is_verified: verifiedFilter.value,
    on_sale: true,
    isCanFetch: !isLoading,
    text: textSearch,
  });

  const { width } = useWindowSize();

  const likeAction = useCallback(
    (id): Promise<any> => {
      if (!user.address) {
        return Promise.reject(new Error('Please login'));
      }
      return userApi.like({ id });
    },
    [user.address],
  );
  const cardsRef = useRef<TNullable<HTMLDivElement>>(null);
  const filtersRef = useRef<TNullable<HTMLDivElement>>(null);
  const anchorRef = useInfiniteScroll(page, allPages, handlePage, isLoading || isNftsLoading);

  useScrollDown(filtersRef, '0px', '64px');
  return (
    <div className={styles.discover}>
      {width <= mobileBreakPoint && (
        <Modal visible={isFilterOpen} onClose={() => setFilterOpen(false)} title="Advanced Filters">
          <AdvancedFilter
            className={cx(styles.mobileAdvancedFilter)}
            filterSelectCurrencyOptions={filterSelectCurrencyOptions}
            maxPrice={maxPrice}
            maxPriceFilter={maxPriceFilter}
            handleMaxPriceFilter={handleMaxPriceFilter}
            currencyFilter={currencyFilter}
            handleCurrencyFilter={handleCurrencyFilter}
            verifiedFilter={verifiedFilter}
            handleVerifiedFilter={handleVerifiedFilter}
            defaultValues={defaultValues}
            resetFilter={resetFilter}
          />
        </Modal>
      )}

      <H2 className={styles.title}>
        <Text className={styles.discoverTitle} tag="span" size="inherit">
          DISCOVER
        </Text>
        <Text tag="span" size="inherit" color="primary">
          ARTWORK
        </Text>
      </H2>
      <div className={styles.filterControls}>
        <div className={styles.filterBody}>
          <Button className={styles.advancedFilterBtn} onClick={handleOpenFilter} color="outline">
            <Text tag="span" color="inherit">
              Advanced Filter
            </Text>{' '}
            <FilterSVG className={styles.icon} />
          </Button>
          <TabLookingComponent
            wrapClassName={styles.tabArea}
            tabClassName={styles.filterTab}
            tabs={convertedTagsForComponents}
            action={handleTagsFilter}
            activeTab={tagsFilter}
          />
          <Select
            className={styles.selectArea}
            onChange={handleOrderByFilter as any}
            value={orderByFilter}
            options={selectOptions}
            classNameSelect={styles.select}
          />
        </div>
      </div>
      <div className={cx(styles.filterAndCards, { [styles.open]: isFilterOpen })}>
        <div className={styles.stickyWrapper}>
          <div ref={filtersRef} className={styles.sticky}>
            <AdvancedFilter
              className={cx(styles.filter, styles.specClass, { [styles.open]: isFilterOpen })}
              filterSelectCurrencyOptions={filterSelectCurrencyOptions}
              maxPrice={maxPrice}
              maxPriceFilter={maxPriceFilter}
              handleMaxPriceFilter={handleMaxPriceFilter}
              currencyFilter={currencyFilter}
              handleCurrencyFilter={handleCurrencyFilter}
              verifiedFilter={verifiedFilter}
              handleVerifiedFilter={handleVerifiedFilter}
              defaultValues={defaultValues}
              resetFilter={resetFilter}
            />
          </div>
        </div>
        <div
          className={cx(styles.filterResultsContainer, {
            [styles.withFilter]: isFilterOpen,
          })}
        >
          <>
            <H3>{totalItems} results</H3>
            <div ref={cardsRef} className={styles.filterResults}>
              <GridLayer
                gap={40}
                wrapperRef={cardsRef}
                minWidth={250}
                minHeight={350}
                justify={EGridJustify.start}
                depenednciesForChange={[isFilterOpen]}
              >
                {!!nftCards.length &&
                  nftCards.map((artCard: any) => {
                    const {
                      media,
                      name,
                      price,
                      currency,
                      available,
                      creator,
                      like_count,
                      tags,
                      id,
                      highest_bid,
                      minimal_bid,
                      bids,
                      is_liked,
                    } = artCard;
                    return (
                      <ArtCard
                        artId={id}
                        key={id}
                        imageMain={media}
                        name={name}
                        price={price || (highest_bid && toFixed(highest_bid.amount)) || minimal_bid}
                        asset={currency.symbol.toUpperCase()}
                        inStockNumber={available}
                        author={creator.name}
                        authorAvatar={creator.avatar}
                        authorId={creator.id}
                        likesNumber={like_count}
                        tags={tags}
                        bids={bids}
                        isLiked={is_liked}
                        likeAction={likeAction}
                      />
                    );
                  })}
              </GridLayer>
            </div>
          </>
          {isNftsLoading && (
            <div className={styles.loaderBox}>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div ref={anchorRef as RefObject<HTMLDivElement>} />
      <LiveAuction className={styles.liveAuction} />
    </div>
  );
});

export default Discover;
