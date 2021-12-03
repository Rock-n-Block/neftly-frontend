import { FC } from 'react';
import { observer } from 'mobx-react';

import Banner from './Banner';
import CreateAndSell from './CreateAndSellNft';
import TopCollections from './TopCollections';

import styles from './Home.module.scss';
import { GradientBlock, LiveAuction } from 'components';

const Home: FC = observer(() => {
  return (
    <div className={styles.container}>
      <Banner />
      <TopCollections />
      <GradientBlock color="orange" align="right" />
      <LiveAuction />
      <GradientBlock color="purple" align="left" />
      <CreateAndSell />
    </div>
  );
});

export default Home;
