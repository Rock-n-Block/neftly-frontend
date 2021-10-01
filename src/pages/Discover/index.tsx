import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { allCategory, arrowUpRight, art, burn, camera, filter, motion, threeD } from 'assets/img';
import cx from 'classnames';
import { ArtCard, Button, Carousel, H2, H3, Select, TabLookingComponent, Text } from 'components';
import { AdvancedFilter } from 'containers';
import { useGetSlideToShow } from 'hooks';

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

const Discover = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const handleOpenFilter = useCallback(() => {
    setFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const [filterOne, setFilterOne] = useState(selectOptions[0]);
  const handleFilterOne = useCallback((value) => {
    setFilterOne(value);
  }, []);

  const numberOfSlide = useGetSlideToShow();

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
        <AdvancedFilter className={cx(styles.filter, { [styles.open]: isFilterOpen })} />
        <div className={cx(styles.filterResultsContainer, { [styles.withFilter]: isFilterOpen })}>
          <H3>3,150,000 results</H3>
          <div className={styles.filterResults}>
            {data.map((artCard, index) => {
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
          {data.map((artCard, index) => {
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
