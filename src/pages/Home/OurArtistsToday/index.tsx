import { FC, useState } from 'react';
import { arrowUpRight } from 'assets/img';
import cx from 'classnames';
import { Button, H2, Text } from 'components';

import { ArtistDetail, ArtistLabel, ArtistsTodayMobile } from './components';
import { artists } from './mockData';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

type CategoryType = {
  label: string;
  value: string;
};

const categories: CategoryType[] = [
  {
    label: 'Most Selling',
    value: 'mostSelling',
  },
  {
    label: 'Most Earing',
    value: 'mostEarning',
  },
  {
    label: 'Most Followed',
    value: 'mostFollowed',
  },
  {
    label: 'Most Favorited',
    value: 'mostFavorited',
  },
];

const OurArtistsToday: FC<Props> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(categories[0]);
  const [selectedArtist, setSelectedArtist] = useState<any>(artists[0]);
  return (
    <div>
      <div className={cx(styles.artistsDesktop, className)}>
        <div className={styles.categorySection}>
          <div className={styles.title}>
            <H2>Our Artists</H2>
            <H2 className={styles.gradientTitle}>Today</H2>
          </div>
          <div className={styles.categoryWrapper}>
            {categories.map(({ label, value }) => (
              <Button
                className={styles.categorySelector}
                color="transparent"
                onClick={() => setSelectedCategory({ label, value })}
              >
                <Text
                  size="m"
                  className={cx(styles.category, {
                    [styles.selected]: selectedCategory.value === value,
                  })}
                >
                  {label}
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
          {artists.map((artist) => {
            const { avatar, name, artsNumber, amount, asset, id } = artist;
            return (
              <Button isFullWidth color="transparent" onClick={() => setSelectedArtist(artist)}>
                <ArtistLabel
                  avatar={avatar}
                  name={name}
                  artsNumber={artsNumber}
                  amount={amount}
                  asset={asset}
                  isSelected={id === selectedArtist.id}
                />
              </Button>
            );
          })}
        </div>
        <div className={styles.artistDetails}>
          <ArtistDetail
            id={1}
            avatar={selectedArtist.avatar}
            name={selectedArtist.name}
            publicKey="0xfshitTokend...dsad"
            description="Digital Artist based in the UK. Known mainly for cover artworks created for some of Hip-Hops biggest names. "
            instagramLink="https://google.com"
            facebookLink="https://google.com"
            twitterLink="https://google.com"
          />
        </div>
      </div>
      <ArtistsTodayMobile className={styles.artistsMobile} />
    </div>
  );
};

export default OurArtistsToday;
