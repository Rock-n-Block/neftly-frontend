import { FC } from 'react';
import { routes } from 'appConstants';
import cx from 'classnames';
import { GradientBlock, Button, H4, Text } from 'components';
import { observer } from 'mobx-react';
import { useMst } from 'store';

import { RandomCard } from './components';

import styles from './styles.module.scss';

const Banner: FC = observer(() => {
  const { user } = useMst();

  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <GradientBlock color="orange" align="left" />
        <H4 className={styles.title}>
          <Text tag="span" size="inherit" className={styles.titleRow} color="black">
            Discover priceless digital art and collect{' '}
            <Text tag="span" size="inherit" className={cx(styles.titleRow, styles.titleGradient)}>
              NFTs
            </Text>
          </Text>
        </H4>
        <Text className={styles.description} size="xl" color="gray">
          Welcome to the world of priceless digital art. explore the best art from hand-picked
          digital artist out there and find the hidden gem.
        </Text>
        <div className={styles.buttons}>
          <Button href={routes.discover.root} color="purple" className={styles.button}>
            Explore
          </Button>
          <Button
            href={user.isAuth ? routes.create.root : routes.connectWallet.root}
            color="outline"
            className={styles.button}
          >
            Create
          </Button>
        </div>
      </div>
      <RandomCard />
      <GradientBlock color="purple" align="right" />
    </div>
  );
});

export default Banner;
