import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import { Button, H2, H3, Loader, Text } from 'components';
import { useFetchTopUsers, useTabs } from 'hooks';
import { TTopUser } from 'typings';

import { ITab } from '../../../components/TabLookingComponent';

import { ArtistDetail, ArtistLabel, ArtistsTodayMobile } from './components';

import styles from './styles.module.scss';

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
  const initialTab = useLocation().search?.replace('?tab=', '') || '';
  const { activeTab, setActiveTab } = useTabs(categories, initialTab);

  const { topUser, isLoading } = useFetchTopUsers(activeTab);

  const [selectedArtist, setSelectedArtist] = useState<TTopUser>(topUser[0]);

  const handleSelectArtis = useCallback((artist: TTopUser) => {
    setSelectedArtist(artist);
  }, []);

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
        </div>
        <div className={styles.artistsSection}>
          {!isLoading ? (
            topUser.map((artist) => {
              const {
                price,
                user: { is_verificated, avatar, display_name, id, owned_tokens },
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
                    artOwned={owned_tokens}
                    activeTab={activeTab}
                  />
                </Button>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
        <div className={styles.artistDetails}>
          {isLoading && <Loader />}
          {topUser.length ? (
            <ArtistDetail
              id={selectedArtist?.user.id}
              avatar={selectedArtist?.user.avatar}
              name={selectedArtist?.user.display_name}
              publicKey={selectedArtist?.user.address}
              description={selectedArtist?.user.bio}
              instagramLink={selectedArtist?.user.instagram}
              facebookLink={selectedArtist?.user.facebook}
              twitterLink={selectedArtist?.user.twitter}
            />
          ) : (
            <H3>No data available</H3>
          )}
        </div>
      </div>
      <ArtistsTodayMobile
        categories={categories}
        categoriesHandler={setActiveTab}
        artistData={topUser}
        className={styles.artistsMobile}
        isLoading={isLoading}
        activeTab={activeTab}
      />
    </div>
  );
};

export default OurArtistsToday;
