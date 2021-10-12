import { title } from 'process';

import { FC } from 'react';
import cx from 'classnames';
import { Carousel, H2 } from 'components';
import { useFetchHotAuction } from 'hooks';

import { HotAuctionCard } from './components';
import { data } from './mockData';

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
        {data.map((auctionItem) => (
          <HotAuctionCard
            key={title}
            title={auctionItem.title}
            author={auctionItem.author}
            authorPic={auctionItem.authorPic}
            artPic={auctionItem.artPic}
            body={auctionItem.body}
            tags={auctionItem.tags}
            views={auctionItem.views}
            likes={auctionItem.likes}
            currentPrice={auctionItem.currentPrice}
            priceAsset={auctionItem.priceAsset}
            auctionEndingTime={auctionItem.auctionEndingTime}
            bidders={auctionItem.bidders}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HotAuction;
