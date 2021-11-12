import { FC } from 'react';
// import cx from 'classnames';
import { Button, H4, Text } from 'components';

import { RandomCard } from './components';
import styles from './styles.module.scss';
import { routes } from 'appConstants';

const Banner: FC = () => (
  <div className={styles.banner}>
    <div className={styles.info}>
      <H4 className={styles.title}>
        <Text tag="span" size="inherit" className={styles.titleRow} color="darkenGray">
          The world of
        </Text>
        <Text tag="span" size="inherit" className={styles.titleRow}>
          SUPER RARE
        </Text>
        <Text tag="span" size="inherit" className={styles.titleRow}>
          ARTWORK
        </Text>
      </H4>
      <Text className={styles.description} size="xl" color="gray">
        Welcome to the world of rare digital art. explore the best art from hand-picked digital
        artist out there and find the hidden gem.
      </Text>
      <div className={styles.buttons}>
        <Button href={routes.discover.root} color="blue" className={styles.button}>
          Explore
        </Button>
        <Button href={routes.create.root} color="outline" className={styles.button}>
          Create
        </Button>
      </div>
    </div>
    <RandomCard />
  </div>
);

export default Banner;
