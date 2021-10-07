import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
// import { allCategory, arrowUpRight, art, burn, camera, filter, motion, threeD } from 'assets/img';
import { allCategory, arrowUpRight, art, filter } from 'assets/img';
import cx from 'classnames';
import { ArtCard, Button, Carousel, H2, H3, Select, TabLookingComponent, Text } from 'components';
import { AdvancedFilter } from 'containers';
import { useFilters, useGetSlideToShow } from 'hooks';

import { data as mockData, dataMediumCards } from './mockData';

import styles from './styles.module.scss';
import { ratesApi, storeApi } from 'services';

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
  const [isLoading, setLoading] = useState(false);
  const [allPages, setAllPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [bids, setBids] = useState<any>([]);
  const [tabs, setTabs] = useState<any>([]);
  const [filterSelectCurrencyOptions, setFilterSelectCurrencyOptions] = useState<any>([]);
  const [filterCurrency, setFilterCurrency] = useState<any>();

  const { handleChangeFilters, queries } = useFilters();
  const handleOpenFilter = useCallback(() => {
    setFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const [filterOne, setFilterOne] = useState(selectOptions[0]);
  const handleFilterOne = useCallback(
    (value) => {
      setFilterOne(value);
      handleChangeFilters('order_by', value.value);
    },
    [handleChangeFilters],
  );

  const fetchTags = useCallback(async () => {
    const links = await storeApi.getTags();
    if (links.data.tags.length) {
      setTabs(
        [{ title: 'All items', icon: allCategory }].concat(
          links.data.tags.map((tag: string) => ({ title: tag, icon: art })),
        ),
      );
    }
  }, []);

  const fetchSearch = useCallback((queriesObject: any, refresh?: boolean) => {
    setLoading(true);
    storeApi
      .getSearchResults(queriesObject)
      .then(({ data }: any) => {
        setTotalItems(data.total_tokens)
        if (refresh) {
          setBids(data.items);
        } else {
          setBids((prev: any) => [...prev, ...data.items]);
        }
        setAllPages(Math.ceil(data.total_tokens / 8));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchRates = useCallback(() => {
    ratesApi
      .getRates()
      .then(({ data }: any) => {
        setFilterSelectCurrencyOptions(
          data.map((currency: any) => ({
            value: currency.symbol,
            label: currency.symbol.toUpperCase(),
          })),
        );
        handleChangeFilters('currency', data[0].symbol);
        setFilterCurrency({ value: data[0].symbol, label: data[0].symbol.toUpperCase() });
      })
      .catch((err: any) => console.log(err));
  }, [handleChangeFilters]);

  const fetchMaxPrice = useCallback(
    (currency: string) => {
      storeApi.getMaxPrice(currency).then(({ data }: any) => {
        handleChangeFilters('max_price', data.max_price);
      });
    },
    [handleChangeFilters],
  );

  const numberOfSlide = useGetSlideToShow();

  useEffect(() => {
    fetchSearch(queries);
  }, [queries, fetchSearch]);

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(isLoading, bids, allPages);

  useEffect(() => {
    if (queries.currency && queries.currency !== filterCurrency?.value) {
      fetchMaxPrice(queries.currency);
    }
  }, [fetchMaxPrice, queries.currency, filterCurrency]);
  useEffect(() => {
    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          tabs={tabs}
          action={() => {}}
          changeFilters={handleChangeFilters}
        />
        <Select onChange={handleFilterOne} value={filterOne} options={selectOptions} />
      </div>
      <div className={cx(styles.filterAndCards, { [styles.open]: isFilterOpen })}>
        <AdvancedFilter
          className={cx(styles.filter, { [styles.open]: isFilterOpen })}
          changeFilters={handleChangeFilters}
          queries={queries}
          filterSelectCurrencyOptions={filterSelectCurrencyOptions}
          filterCurrency={filterCurrency}
          setFilterCurrency={setFilterCurrency}
        />
        <div className={cx(styles.filterResultsContainer, { [styles.withFilter]: isFilterOpen })}>
          <H3>{totalItems} results</H3>
          <div className={styles.filterResults}>
            {mockData.map((artCard, index) => {
              const {
                image,
                name,
                price,
                asset,
                inStockNumber,
                author,
                authorAvatar,
                likesNumber,
                tags,
              } = artCard;
              return (
                <Link to={`${routes.gallery.detailArtwork.link}/${index}`}>
                  <ArtCard
                    key={name}
                    imageMain={image}
                    name={name}
                    price={price}
                    asset={asset}
                    inStockNumber={inStockNumber}
                    author={author}
                    authorAvatar={authorAvatar}
                    likesNumber={likesNumber}
                    tags={tags}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.liveAuction}>
        <H3>Live Auction Today</H3>
        <Carousel slidesToShow={numberOfSlide}>
          {mockData.map((artCard, index) => {
            const {
              image,
              name,
              price,
              asset,
              inStockNumber,
              author,
              authorAvatar,
              likesNumber,
              tags,
            } = artCard;
            return (
              <Link to={`${routes.gallery.detailAuction.link}/${index}`}>
                <ArtCard
                  imageMain={image}
                  name={name}
                  price={price}
                  asset={asset}
                  inStockNumber={inStockNumber}
                  author={author}
                  authorAvatar={authorAvatar}
                  likesNumber={likesNumber}
                  tags={tags}
                />
              </Link>
            );
          })}
        </Carousel>
      </div>
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
                <Link to={`${routes.gallery.detailAuction.link}/${index}`}>
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
