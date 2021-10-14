import { FC, useCallback, useEffect, useState } from 'react';
import { arrowUpRight } from 'assets/img';
import cx from 'classnames';
import { Button, H2, Loader, Text } from 'components';
import { useFetchTopUsers, useTabs } from 'hooks';
import { TTopUser } from 'typings';

import { ArtistDetail, ArtistLabel, ArtistsTodayMobile } from './components';

import styles from './styles.module.scss';
import { ITab } from '../../../components/TabLookingComponent';
import { useLocation } from 'react-router-dom';

type Props = {
  className?: string;
};

const categories: ITab[] = [
  {
    title: 'Most Selling',
    key: 'seller',
  },
  {
    title: 'Most Earing',
    key: 'buyer',
  },
  {
    title: 'Most Followed',
    key: 'follows',
  },
];

const OurArtistsToday: FC<Props> = ({ className }) => {
  // const [selectedCategory, setSelectedCategory] = useState<CategoryType>(categories[0]);

  const initialTab = useLocation().search?.replace('?tab=', '') || '';
  const { activeTab, setActiveTab } = useTabs(categories, initialTab);

  const { topUser, isLoading } = useFetchTopUsers(activeTab);

  const [selectedArtist, setSelectedArtist] = useState<TTopUser>(topUser[0]);

  const handleSelectArtis = useCallback((artist: TTopUser) => {
    setSelectedArtist(artist);
  }, []);

  /*  const handleSelelectCategory = useCallback((value: OptionType) => {
      setSelectedCategory(value);
    }, []); */

  useEffect(() => {
    handleSelectArtis(topUser[0]);
  }, [handleSelectArtis, topUser]);
  return (
    <div>
      <div className={cx(styles.artistsDesktop, className)}>
        <div className={styles.categorySection}>
          <div className={styles.title}>
            <H2>Our Artists</H2>
            <H2 className={styles.gradientTitle}>Today</H2>
          </div>
          <div className={styles.categoryWrapper}>
            {categories.map(({ key, title }) => (
              <Button
                className={styles.categorySelector}
                color="transparent"
                onClick={() => setActiveTab(key)}
                key={title}
              >
                <Text
                  size="m"
                  className={cx(styles.category, {
                    [styles.selected]: activeTab === key,
                  })}
                >
                  {title}
                </Text>
              </Button>
            ))}
          </div>
          <Button className={styles.moreArtistsBtn} color="transparent">
            <Text size="l" color="secondary">
              More Artists <img className={styles.arrowPic} src={arrowUpRight} alt="" />
            </Text>
          </Button>
        </div>
        <div className={styles.artistsSection}>
          {!isLoading ? (
            topUser.map((artist) => {
              const {
                price,
                id,
                user: { is_verificated, avatar, display_name },
              } = artist;
              return (
                <Button
                  isFullWidth
                  color="transparent"
                  onClick={() => handleSelectArtis(artist)}
                  key={id}
                >
                  <ArtistLabel
                    avatar={avatar}
                    name={display_name}
                    amount={price}
                    isSelected={id === selectedArtist?.user?.id}
                    isVerified={is_verificated}
                  />
                </Button>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
        <div className={styles.artistDetails}>
          {!isLoading ? (
            <ArtistDetail
              id={1}
              avatar={selectedArtist?.user.avatar}
              name={selectedArtist?.user.display_name}
              publicKey={selectedArtist?.user.address}
              description={selectedArtist?.user.bio}
              instagramLink={selectedArtist?.user.instagram}
              facebookLink={selectedArtist?.user.facebook}
              twitterLink={selectedArtist?.user.twitter}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <ArtistsTodayMobile
        categories={categories}
        categoriesHandler={setActiveTab}
        artistData={topUser}
        className={styles.artistsMobile}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OurArtistsToday;
