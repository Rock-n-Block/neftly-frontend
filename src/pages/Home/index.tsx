import { observer } from 'mobx-react';
import { FC } from 'react';
import Banner from './Banner';
import HotAuction from './HotAuction';
import HotCollections from './HotCollections';
import HowItWorks from './HowItWorks';
import OurArtistsToday from './OurArtistsToday';
import OurArtworkGallery from './OurArtworkGallery';

import styles from './Home.module.scss';

const Home: FC = observer(() => {
  return (
    <div className={styles.container}>
      <Banner />
      <HotAuction />
      <OurArtistsToday />
      <OurArtworkGallery />
      <HotCollections />
      <HowItWorks />
    </div>
  );
});

export default Home;
