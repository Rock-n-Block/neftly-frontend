import { RefObject, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
// import { allCategory, arrowUpRight, art, burn, camera, filter, motion, threeD } from 'assets/img';
import { allCategory, arrowUpRight, art, filter } from 'assets/img';
import cx from 'classnames';
import {
  ArtCard,
  Button,
  LiveAuction,
  H2,
  H3,
  Select,
  TabLookingComponent,
  Text,
} from 'components';
import { AdvancedFilter } from 'containers';
import { useFilters, useInfiniteScroll } from 'hooks';

import { dataMediumCards } from './mockData';

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
  const [maxPrice, setMaxPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [bids, setBids] = useState<any>([]);
  const [tabs, setTabs] = useState<any>([]);
  const [filterSelectCurrencyOptions, setFilterSelectCurrencyOptions] = useState<any>([]);
  const [filterCurrency, setFilterCurrency] = useState<any>();

  const increasePage = () => {
    setPage(page + 1);
  };

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
    setLoading(true);
    const links = await storeApi.getTags();
    if (links.data.tags.length) {
      setTabs(
        [{ title: 'All items', icon: allCategory }].concat(
          links.data.tags.map((tag: string) => ({ title: tag, icon: art })),
        ),
      );
    }
    setLoading(false);
  }, []);

  const fetchSearch = useCallback(() => {
    const refresh = page === 1;
    setLoading(true);
    storeApi
      .getSearchResults({ ...queries, page })
      .then(({ data }: any) => {
        setTotalItems(data.total_tokens);
        if (refresh) {
          setBids(data.items);
        } else {
          setBids((prev: any) => {
            console.log('prev', prev, 'data.items', data.items, 'combined', [
              ...prev,
              ...data.items,
            ]);
            return [...prev, ...data.items];
          });
          console.log(bids, 'bids in promise');
        }
        setAllPages(Math.ceil(data.total_tokens / 6));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bids, queries, page]);

  console.log(bids, 'bids in promise');

  const fetchRates = useCallback(() => {
    setLoading(true);
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
      .catch((err: any) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [handleChangeFilters]);

  const fetchMaxPrice = useCallback(
    (currency: string) => {
      setLoading(true);
      storeApi
        .getMaxPrice(currency)
        .then(({ data }: any) => {
          handleChangeFilters('max_price', data.max_price);
          setMaxPrice(data.max_price);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [handleChangeFilters],
  );
    console.log(queries);
  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries, page]);

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterCurrency?.value) {
      fetchMaxPrice(filterCurrency?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCurrency]);

  useEffect(() => {
    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anchorRef = useInfiniteScroll(page < allPages, isLoading, fetchSearch, () =>
    increasePage(),
  );

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
          filterSelectCurrencyOptions={filterSelectCurrencyOptions}
          filterCurrency={filterCurrency}
          setFilterCurrency={setFilterCurrency}
          maxPrice={maxPrice}
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

            <div
              style={{ height: '1px', width: '100%' }}
              ref={anchorRef as RefObject<HTMLDivElement>}
            />
          </div>
        </div>
      </div>
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
