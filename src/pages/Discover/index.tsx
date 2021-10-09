import { RefObject, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { arrowUpRight, filter } from 'assets/img';
import cx from 'classnames';
import {
  ArtCard,
  Button,
  H2,
  H3,
  LiveAuction,
  Select,
  TabLookingComponent,
  Text,
} from 'components';
import { AdvancedFilter } from 'containers';
import { useFetchNft, useFilters, useInfiniteScroll } from 'hooks';

import { dataMediumCards } from './mockData';

import styles from './styles.module.scss';

// type DiscoverProps = {};
// const tabs = [
//   {
//     title: 'Featured',
//     icon: burn,
//   },
//   {
//     title: 'All Items',
//     icon: allCategory,
//   },
//   {
//     title: 'Art',
//     icon: art,
//   },
//   {
//     title: 'Photography',
//     icon: camera,
//   },
//   {
//     title: '3D',
//     icon: threeD,
//   },
//   {
//     title: 'Motion',
//     icon: motion,
//   },
// ];

const selectOptions = [
  {
    label: 'Newest',
    value: '-date',
  },
  {
    label: 'Latest',
    value: 'date',
  },
  {
    label: 'Highest price',
    value: '-price',
  },
  {
    label: 'Lowest price',
    value: 'price',
  },
  {
    label: 'Most liked',
    value: '-likes',
  },
  {
    label: 'Least liked',
    value: 'likes',
  },
];

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

  const { allPages, totalItems, bids } = useFetchNft(
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
          action={() => {}}
          changeFilters={handleTagsFilter}
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
            {bids.length
              ? bids.map((artCard: any) => {
                  const { media, name, price, currency, available, creator, like_count, tags, id } =
                    artCard;
                  return (
                    <Link to={`${routes.nft.link}/${id}`}>
                      <ArtCard
                        key={name}
                        imageMain={media}
                        name={name}
                        price={price}
                        asset={currency.symbol.toUpperCase()}
                        inStockNumber={available}
                        author={creator.name}
                        authorAvatar={creator.avatar}
                        likesNumber={like_count}
                        tags={tags}
                      />
                    </Link>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div
        style={{ height: '20px', background: 'red' }}
        ref={anchorRef as RefObject<HTMLDivElement>}
      />
      <LiveAuction className={styles.liveAuction} />
      <div>
        <div>
          <div className={styles.recommendArtworkTitle}>
            <H3>Recommended Bundling Artworks</H3>
            <Button className={styles.recommendedArtworkBtn} color="transparent">
              <Text size="l" color="secondary">
                More Bundling Artworks <img className={styles.arrowPic} src={arrowUpRight} alt="" />
              </Text>
            </Button>
          </div>
          <div className={styles.recommendArtworkCardContainer}>
            {dataMediumCards.map((card, index) => {
              const {
                image,
                imageSecondary1,
                imageSecondary2,
                imageSecondary3,
                name,
                price,
                asset,
                inStockNumber,
                author,
                authorAvatar,
                likesNumber,
              } = card;
              return (
                <Link to={`${routes.nft.link}/${index}`}>
                  <ArtCard
                    type="Medium"
                    imageMain={image}
                    imageSecondaryOne={imageSecondary1}
                    imageSecondaryTwo={imageSecondary2}
                    imageSecondaryThree={imageSecondary3}
                    name={name}
                    price={price}
                    asset={asset}
                    inStockNumber={inStockNumber}
                    author={author}
                    authorAvatar={authorAvatar}
                    likesNumber={likesNumber}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
