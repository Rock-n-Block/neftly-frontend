import { FC } from 'react';
import cx from 'classnames';
import { H1, Text } from 'components';

import { DiscoverMore, Star } from './components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const Banner: FC<Props> = ({ className }) => (
  <div className={styles.firstBlockContainer}>
    <div className={styles.contentWrapper}>
      <div className={cx(styles.banner, className)}>
        <div className={styles.titleAndStar}>
          <H1 className={styles.title}>THE WORLD OF</H1>
          <Star className={cx(styles.purpleStar, styles.desktopStar)} size="small" color="purple" />
        </div>
        <div className={styles.textAndStars}>
          <div className={styles.starsWrapper}>
            <Star className={cx(styles.greenStar, styles.desktopStar)} size="big" color="green" />
            <Star className={cx(styles.blueStar, styles.desktopStar)} size="med" color="blue" />
          </div>
          <div className={styles.textWrapper}>
            <H1 className={cx(styles.titleGradient, styles.title)}>SUPER RARE</H1>
            <H1 className={cx(styles.titleGradient, styles.title)}>ARTWORK</H1>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <Text size="xl">
          Welcome to the world of rare digital art. Explore the best art from hand-picked digital
          artist out there and find the hidden gem.
        </Text>
      </div>
    </div>
    <DiscoverMore />
  </div>
);

export default Banner;
