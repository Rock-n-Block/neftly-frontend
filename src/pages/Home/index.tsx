import { useEffect, useState } from 'react';
import Hero from './Hero';
// import Selection from './Selection';
// import Popular from './Popular';
// import HotBid from '../../components/HotBid';
// import Collections from './Collections';
import Discover from './Discover';
import { observer } from 'mobx-react';
import { useMst } from '../../store/store';
// import Description from './Description';

const Home: React.FC = observer(() => {
  const { user } = useMst();
  const [isShow, setIsShow] = useState(user.is_searching)
  useEffect(() => {
    setIsShow(user.is_searching)
  }, [user.is_searching])
  return (
    <>
      {!isShow && <Hero />}
      {/* <Selection />
    <Popular />
    <HotBid classSection="section" />
    <Collections /> */}
      <Discover />
      {/* <Description /> */}
    </>
  );
});

export default Home;
