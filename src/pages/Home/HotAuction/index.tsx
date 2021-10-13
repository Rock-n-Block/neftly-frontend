import { FC } from 'react';
import cx from 'classnames';
import { Carousel, H2 } from 'components';
import { useFetchHotAuction } from 'hooks';

import { HotAuctionCard } from './components';
import { INft } from 'typings';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const HotAuction: FC<Props> = ({ className }) => {
  const { hotAuction } = useFetchHotAuction();
  return (
    <div className={cx(styles.hotAuction, className)}>
      <H2 className={styles.hotAuctionTitle}>
        HOT <span className={styles.gradientTitle}>AUCTION</span>
      </H2>
      <Carousel classNameProp={styles.hotAuctionCarousel}>
        {hotAuction.map((auction: INft) => {
          return <HotAuctionCard key={auction.id} nft={auction} />;
        })}
      </Carousel>
    </div>
  );
};

export default HotAuction;
