import {FC} from 'react';
import {observer} from 'mobx-react';

import Banner from './Banner';
import CreateAndSell from './CreateAndSellNft';
import TopCollections from './TopCollections';
import ResourceForGettingStarted from './ResourceForGettingStarted';

import styles from './Home.module.scss';

const Home: FC = observer(() => {
  return (
    <div className={styles.container}>
      <Banner/>
      <TopCollections/>
      <CreateAndSell/>
      <ResourceForGettingStarted/>
    </div>
  );
});

export default Home;
