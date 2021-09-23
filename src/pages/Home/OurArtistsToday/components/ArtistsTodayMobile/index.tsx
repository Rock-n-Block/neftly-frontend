import { FC, useState } from 'react';
import cx from 'classnames';
import { Button, H2, Text } from 'components';

import { artists } from '../../mockData';
import { ArtistLabel } from '..';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const artistsLabels = [...artists, ...artists]
  .map((artist) => {
    const { avatar, name, artsNumber, amount, asset } = artist;
    return (
      <ArtistLabel
        avatar={avatar}
        name={name}
        artsNumber={artsNumber}
        amount={amount}
        asset={asset}
      />
    );
  })
  .slice(0, 6);

const tabHelper = [
  {
    title: 'Most Selling',
    body: artistsLabels,
  },
  {
    title: 'Most Earning',
    body: artistsLabels,
  },
  {
    title: 'Most Followed',
    body: artistsLabels,
  },
  {
    title: 'Most Favorited',
    body: artistsLabels,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ArtistsTodayMobile: FC<Props> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleClick = (index: number) => {
    setSelectedCategory(index);
  };
  return (
    <div className={cx(styles.mobileOurArtist, className)}>
      <H2 align="center">Our Artists</H2>
      <H2 className={styles.gradientTitle}>Today</H2>
      <div className={styles.scrollProvider}>
        <div className={styles.tabWrapper}>
          {tabHelper.map(({ title }, index) => (
            <Button
              onClick={() => handleClick(index)}
              color="transparent"
              className={cx(styles.tab, { [styles.selected]: index === selectedCategory })}
            >
              <Text className={styles.tabText} size="l">
                {title}
              </Text>
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.artistsWrapper}>
        {artistsLabels}

        <Button onClick={() => alert('load more')} isFullWidth color="outline">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default ArtistsTodayMobile;
