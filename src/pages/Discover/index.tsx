import { useCallback, useState } from 'react';
import { allCategory, arrowUpRight, art, burn, camera, filter, motion, threeD } from 'assets/img';
import cx from 'classnames';
import { ArtCard, Button, Carousel, H2, H3, Select, TabLookingComponent, Text } from 'components';
import { AdvancedFilter } from 'containers';
import { useWindowSize } from 'hooks';

import { data, dataMediumCards } from './mockData';

import styles from './styles.module.scss';

// type DiscoverProps = {};
const tabs = [
  {
    title: 'Featured',
    icon: burn,
  },
  {
    title: 'All Items',
    icon: allCategory,
  },
  {
    title: 'Art',
    icon: art,
  },
  {
    title: 'Photography',
    icon: camera,
  },
  {
    title: '3D',
    icon: threeD,
  },
  {
    title: 'Motion',
    icon: motion,
  },
];

const selectOptions = [
  {
    label: 'Latest',
    value: 'latest',
  },
  {
    label: 'Featured',
    value: 'featured',
  },
  {
    label: 'Rare',
    value: 'rare',
  },
];

const slidesToShow = (width: number): number => {
  if (width < 750) {
    return 1;
  }
  if (width < 1100) {
    return 2;
  }
  if (width < 1600) {
    return 3;
  }

  return 4;
};

const Discover = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const handleOpenFilter = useCallback(() => {
    setFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const [filterOne, setFilterOne] = useState(selectOptions[0]);
  const handleFilterOne = useCallback((value) => {
    setFilterOne(value);
  }, []);

  const { width } = useWindowSize();

  return (
    <div className={styles.discover}>
      <div className={styles.title}>
        <H2>
          DISCOVER <span className={styles.gradientTitle}>ARTWORK</span>
        </H2>
      </div>
      <div className={styles.filterControls}>
        <Button className={styles.advancedFilterBtn} onClick={handleOpenFilter} color="outline">
          Advanced Filter <img src={filter} alt="" />
        </Button>
        <TabLookingComponent tabClassName={styles.filterTab} tabs={tabs} action={() => {}} />
        <Select onChange={handleFilterOne} value={filterOne} options={selectOptions} />
      </div>
      <div className={cx(styles.filterAndCards, { [styles.open]: isFilterOpen })}>
        <div className={cx(styles.filter, { [styles.open]: isFilterOpen })}>
          <AdvancedFilter />
        </div>
        <div className={cx(styles.filterResultsContainer, { [styles.withFilter]: isFilterOpen })}>
          <H3>3,150,000 results</H3>
          <div className={styles.filterResults}>
            {data.map((artCard) => {
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
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.liveAuction}>
        <H3>Live Auction Today</H3>
        <Carousel slidesToShow={slidesToShow(width)}>
          {data.map((artCard) => {
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
            {dataMediumCards.map((card) => {
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
