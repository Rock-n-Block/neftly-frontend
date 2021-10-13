import { FC } from 'react';
import cx from 'classnames';
import { Carousel, H2 } from 'components';
import { useFetchHotAuction } from 'hooks';

import { HotAuctionCard } from './components';

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
        {hotAuction.map((auction) => {
          const {
            media,
            description,
            tags,
            like_count,
            id,
            end_auction,
            currency: { rate, symbol },
            creator: { avatar, name },
            bids,
            is_liked,
          } = auction;
          return (
            <HotAuctionCard
              key={id}
              title={auction.name}
              author={name}
              authorPic={avatar}
              artPic={media}
              body={description}
              tags={tags}
              views={10}
              likes={like_count}
              currentPrice={+rate}
              priceAsset={symbol}
              auctionEndingTime={end_auction}
              bidders={bids}
              isLiked={is_liked}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default HotAuction;
