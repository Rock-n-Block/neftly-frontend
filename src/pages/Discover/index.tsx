import { RefObject, useCallback, useEffect, useState } from 'react';
import { filter } from 'assets/img';
import cx from 'classnames';
import { ArtCard, Button, H2, H3, LiveAuction, Select, TabLookingComponent } from 'components';
import { AdvancedFilter } from 'containers';
import { useFetchNft, useFilters, useInfiniteScroll } from 'hooks';
import { observer } from 'mobx-react-lite';
import { userApi } from 'services';
import { useMst } from 'store';
import { selectOptions } from 'typings';
import { findQueryParameter, toFixed } from 'utils';

import styles from './styles.module.scss';

const Discover = observer(() => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { user } = useMst();

  const fullUrlPath = window.location.href;
  const filterVar = findQueryParameter(fullUrlPath, 'filter');

  console.log(filterVar);

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
  } = useFilters();

  const [allPages, totalItems, nftCards, isNftsLoading] = useFetchNft({
    page,
    sort: 'items',
    order_by: orderByFilter.value,
    tags: tagsFilter,
    max_price: maxPriceFilter,
    currency: currencyFilter.value,
    is_verified: verifiedFilter.value,
    on_sale: true,
    isCanFetch: !isLoading,
  });

  const likeAction = useCallback(
    (id): Promise<any> => {
      if (!user.address) {
        return Promise.reject(new Error('Please login'));
      }
      return userApi.like({ id });
    },
    [user.address],
  );
  const anchorRef = useInfiniteScroll(page, allPages, handlePage, isLoading || isNftsLoading);

  useEffect(() => {
    if (!nftCards.length) {
      setFilterOpen(false);
    }
  }, [nftCards.length]);

  return (
    <div className={styles.discover}>
      <H2 className={styles.title}>
        DISCOVER <span className={styles.gradientTitle}>ARTWORK</span>
      </H2>
      <div className={styles.filterControls}>
        <Button className={styles.advancedFilterBtn} onClick={handleOpenFilter} color="outline">
          Advanced Filter <img src={filter} className={styles.image} alt="" />
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
          classNameSelect={styles.select}
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
          verifiedFilter={verifiedFilter}
          handleVerifiedFilter={handleVerifiedFilter}
        />
        <div
          className={cx(styles.filterResultsContainer, {
            [styles.withFilter]: isFilterOpen,
          })}
        >
          <H3>{totalItems} results</H3>
          <div className={styles.filterResults}>
            {nftCards.length
              ? nftCards.map((artCard: any) => {
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
                })
              : null}
          </div>
        </div>
      </div>
      <div ref={anchorRef as RefObject<HTMLDivElement>} />
      <LiveAuction className={styles.liveAuction} />
    </div>
  );
});

export default Discover;
