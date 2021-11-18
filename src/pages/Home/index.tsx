import { FC } from 'react';
import { observer } from 'mobx-react';

import Banner from './Banner';
import CreateAndSell from './CreateAndSellNft';
// import HotAuction from './HotAuction';
import TopCollections from './TopCollections';
// import OurArtistsToday from './OurArtistsToday';
// import OurArtworkGallery from './OurArtworkGallery';
import ResourceForGettingStarted from './ResourceForGettingStarted';

import styles from './Home.module.scss';

const Home: FC = observer(() => {
  return (
    <div className={styles.container}>
      <Banner />
      {/* <HotAuction />
      <OurArtistsToday /> */}
      {/* <OurArtworkGallery />*/}
      <TopCollections />
      <CreateAndSell />
      <ResourceForGettingStarted />
    </div>
  );
});

export default Home;
