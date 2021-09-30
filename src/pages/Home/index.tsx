import { observer } from 'mobx-react';

import Banner from './Banner';
import HotAuction from './HotAuction';
import HotCollections from './HotCollections';
import HowItWorks from './HowItWorks';
import OurArtistsToday from './OurArtistsToday';
import OurArtworkGallery from './OurArtworkGallery';

const Home: React.FC = observer(() => {
  return (
    <>
      <Banner />
      <HotAuction />
      <OurArtistsToday />
      <OurArtworkGallery />
      <HotCollections />
      <HowItWorks />
    </>
  );
});

export default Home;
