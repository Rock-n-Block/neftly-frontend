import { RefObject, useCallback, useState } from 'react';
import { filter } from 'assets/img';
import cx from 'classnames';
import { ArtCard, Button, H2, H3, LiveAuction, Select, TabLookingComponent } from 'components';
import { AdvancedFilter } from 'containers';
import { useFetchNft, useFilters, useInfiniteScroll } from 'hooks';

import { selectOptions } from './helperData';

import styles from './styles.module.scss';
import BigNumber from 'bignumber.js';

const Discover = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenFilter = useCallback(() => {
    setFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const {
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
  } = useFilters(setIsLoading);

  const { allPages, totalItems, tokens } = useFetchNft(
    setIsLoading,
    page,
    'items',
    orderByFilter.value,
    tagsFilter,
    maxPriceFilter,
    currencyFilter.value,
    verifiedFilter.value,
  );

  const anchorRef = useInfiniteScroll(page, allPages, handlePage, isLoading);
  return (
    <div className={styles.discover}>
      <H2 className={styles.title}>
        DISCOVER <span className={styles.gradientTitle}>ARTWORK</span>
      </H2>
      <div className={styles.filterControls}>
        <Button className={styles.advancedFilterBtn} onClick={handleOpenFilter} color="outline">
          Advanced Filter <img src={filter} alt="" />
        </Button>
        <TabLookingComponent
          tabClassName={styles.filterTab}
          tabs={filterTags}
          action={handleTagsFilter}
        />
        <Select
          onChange={handleOrderByFilter as any}
          value={orderByFilter}
          options={selectOptions}
        />
      </div>
      <div className={cx(styles.filterAndCards, { [styles.open]: isFilterOpen })}>
        <AdvancedFilter
          className={cx(styles.filter, { [styles.open]: isFilterOpen })}
          filterSelectCurrencyOptions={filterSelectCurrencyOptions}
          maxPrice={maxPrice}
          maxPriceFilter={maxPriceFilter}
          handleMaxPriceFilter={handleMaxPriceFilter}
          currencyFilter={currencyFilter}
          handleCurrencyFilter={handleCurrencyFilter}
          likesFilter={likesFilter}
          handleLikesFilter={handleLikesFilter}
          verifiedFilter={verifiedFilter}
          handleVerifiedFilter={handleVerifiedFilter}
        />
        <div className={cx(styles.filterResultsContainer, { [styles.withFilter]: isFilterOpen })}>
          <H3>{totalItems} results</H3>
          <div className={styles.filterResults}>
            {tokens.length
              ? tokens.map((artCard: any) => {
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
                  } = artCard;
                  return (
                    <ArtCard
                      artId={id}
                      key={name}
                      imageMain={media}
                      name={name}
                      price={
                        price ||
                        (highest_bid && new BigNumber(highest_bid.amount).toFixed()) ||
                        minimal_bid
                      }
                      asset={currency.symbol.toUpperCase()}
                      inStockNumber={available}
                      author={creator.name}
                      authorAvatar={creator.avatar}
                      likesNumber={like_count}
                      tags={tags}
                      bids={bids}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div ref={anchorRef as RefObject<HTMLDivElement>} />
      <LiveAuction className={styles.liveAuction} />
    </div>
  );
};

export default Discover;
