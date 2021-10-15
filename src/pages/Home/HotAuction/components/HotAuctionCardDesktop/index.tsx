/* eslint-disable react/no-unused-prop-types */
import { FC } from 'react';
import cx from 'classnames';
import { H3 } from 'components';

import AuthorComponent from '../AuthorComponent';
import BiddersComponent from '../BiddersComponent';
import DescriptionAndTagsComponent from '../DescriptionAndTagsComponent';
import PaymentComponent from '../PaymentComponent';
import ViewsAndControlsComponent from '../ViewsAndControlsComponent';

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
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
};

const HotAuctionCardDesktop: FC<Props> = ({
  className,
  title,
  authorPic,
  author,
  body,
  tags,
  views,
  likes,
  artPic,
  bidders,
  isUserCanEndAuction,
  isUserCanBuyNft,
  isUserCanEnterInAuction,
  isUserCanPutOnSale,
  isOwner,
  isUserCanRemoveFromSale,
}) => (
  <div className={cx(styles.desktopCard, className)}>
    <div className={styles.descriptionControls}>
      <div className={styles.description}>
        <H3>{title}</H3>
        <AuthorComponent authorPic={authorPic} author={author} />
        <DescriptionAndTagsComponent body={body} tags={tags} />
      </div>
      <ViewsAndControlsComponent
        likes={likes}
        views={views}
        nft={null}
        isOwner={isOwner}
        isUserCanRemoveFromSale={isUserCanRemoveFromSale}
      />
    </div>
    <div className={styles.imageWrapper}>
      <img src={artPic} alt="art pic" />
    </div>
    <div className={styles.priceAndBidders}>
      <PaymentComponent
        nft={null}
        isUserCanEndAuction={isUserCanEndAuction}
        isUserCanBuyNft={isUserCanBuyNft}
        isUserCanEnterInAuction={isUserCanEnterInAuction}
        isUserCanPutOnSale={isUserCanPutOnSale}
        isOwner={isOwner}
      />
      <BiddersComponent bidders={bidders} />
    </div>
  </div>
);

export default HotAuctionCardDesktop;
