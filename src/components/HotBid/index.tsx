import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import Slider from 'react-slick/lib/index';
import cn from 'classnames';

// data
// import { bids } from '../../mocks/bids';
import { storeApi } from '../../services/api';
import Card from '../Card';
import Icon from '../Icon';

import styles from './HotBid.module.scss';

// TODO: убрать any
const SlickArrow: React.FC<any> = ({ children, ...props }) => (
  <button type="button" {...props}>
    {children}
  </button>
);

interface IHotProps {
  classSection: string;
}

const Hot: React.FC<IHotProps> = ({ classSection }) => {
  const [bids, setBids] = useState([]);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1179,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };

  const fetchBids = useCallback(() => {
    storeApi
      .getHotBids()
      .then(({ data }: any) => setBids(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn('h3', styles.title)}>Hot bid</h3>
          <div className={styles.inner}>
            <Slider className="bid-slider" {...settings}>
              {bids.map((x) => (
                <Card key={nextId()} className={styles.card} item={x} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hot;
