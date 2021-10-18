/* eslint-disable react/no-unused-prop-types */
import { FC } from 'react';
import cx from 'classnames';
import { H3, Text } from 'components';

import AuthorComponent from '../AuthorComponent';
import BiddersComponent from '../BiddersComponent';
import DescriptionAndTagsComponent from '../DescriptionAndTagsComponent';
import PaymentComponent from '../PaymentComponent';
import ViewsAndControlsComponent from '../ViewsAndControlsComponent';
import { INft } from 'typings';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  nft: INft;
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
  isWrongChain: boolean;
  tooltipPlacement?: 'top' | 'bottom';
};

const HotAuctionCardDesktop: FC<Props> = ({
  className,
  nft,
  isUserCanEndAuction,
  isUserCanBuyNft,
  isUserCanEnterInAuction,
  isUserCanPutOnSale,
  isOwner,
  tooltipPlacement,
  isUserCanRemoveFromSale,
  isWrongChain,
}) => (
  <div className={cx(styles.desktopCard, className)}>
    <div className={styles.descriptionControls}>
      <div className={styles.description}>
        <H3>{nft.name}</H3>
        <AuthorComponent authorPic={nft.creator.avatar} author={nft.creator.name} />
        <DescriptionAndTagsComponent body={nft.description} tags={nft.tags} />
      </div>
      <ViewsAndControlsComponent
        likes={nft.like_count}
        nft={nft}
        isOwner={isOwner}
        isUserCanRemoveFromSale={isUserCanRemoveFromSale}
        tooltipPlacement={tooltipPlacement}
        isWrongChain={isWrongChain}
      />
    </div>
    <div className={styles.imageWrapper}>
      <img src={nft.media} alt="art pic" />
    </div>
    <div className={styles.priceAndBidders}>
      {!isWrongChain ? (
        <PaymentComponent
          nft={nft}
          isUserCanEndAuction={isUserCanEndAuction}
          isUserCanBuyNft={isUserCanBuyNft}
          isUserCanEnterInAuction={isUserCanEnterInAuction}
          isUserCanPutOnSale={isUserCanPutOnSale}
          isOwner={isOwner}
        />
      ) : null}
      <BiddersComponent bidders={nft.bids} />
    </div>
  </div>
);

export default HotAuctionCardDesktop;
