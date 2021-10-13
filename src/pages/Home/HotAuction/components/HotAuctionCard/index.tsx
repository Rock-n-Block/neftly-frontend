import { FC } from 'react';
import cx from 'classnames';

import HotAuctionCardDesktop from '../HotAuctionCardDesktop';
import HotAuctionCardMobile from '../HotAuctionCardMobile';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  title: string;
  author: string;
  authorPic: string;
  artPic: string;
  body: string;
  tags: string[];
  views: number;
  likes: number;
  currentPrice: number;
  priceAsset: string;
  auctionEndingTime: any;
  bidders: any[];
  isLiked: boolean;
};

const HotAuctionCard: FC<Props> = ({
  className,
  title,
  authorPic,
  author,
  body,
  tags,
  views,
  likes,
  artPic,
  currentPrice,
  priceAsset,
  auctionEndingTime,
  bidders,
  isLiked,
}) => {
  console.log(isLiked);
  return (
    <div className={cx(styles.hotAuctionCard, className)}>
      <HotAuctionCardDesktop
        className={styles.desktopAuctionCard}
        title={title}
        authorPic={authorPic}
        author={author}
        body={body}
        tags={tags}
        views={views}
        likes={likes}
        artPic={artPic}
        currentPrice={currentPrice}
        priceAsset={priceAsset}
        auctionEndingTime={auctionEndingTime}
        bidders={bidders}
      />
      <HotAuctionCardMobile
        className={styles.mobileAuctionCard}
        title={title}
        authorPic={authorPic}
        author={author}
        body={body}
        tags={tags}
        views={views}
        likes={likes}
        artPic={artPic}
        auctionEndingTime={auctionEndingTime}
        bidders={bidders}
      />
    </div>
  );
};

export default HotAuctionCard;
