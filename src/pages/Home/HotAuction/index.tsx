import { FC } from 'react';
import cx from 'classnames';
import { Carousel, H2 } from 'components';
import { useFetchHotAuction } from 'hooks';
import { observer } from 'mobx-react-lite';
import { INft } from 'typings';

import { useMst } from '../../../store';

import { HotAuctionCard } from './components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const HotAuction: FC<Props> = ({ className }) => {
  const {
    modals: {
      sell: { placeBid },
      remove,
      burn,
      transfer,
    },
  } = useMst();

  const { hotAuction } = useFetchHotAuction(
    placeBid.isSuccess || remove.isSuccess || burn.isSuccess || transfer.isSuccess,
  );

  return (
    <div className={cx(styles.hotAuction, className)}>
      <H2 className={styles.hotAuctionTitle}>
        HOT <span className={styles.gradientTitle}>AUCTION</span>
      </H2>
      <Carousel classNameProp={styles.hotAuctionCarousel}>
        {hotAuction?.length ? (
          hotAuction.map((auction: INft) => {
            return <HotAuctionCard key={auction.id} nft={auction} />;
          })
        ) : (
          <></>
        )}
      </Carousel>
    </div>
  );
};

export default observer(HotAuction);
