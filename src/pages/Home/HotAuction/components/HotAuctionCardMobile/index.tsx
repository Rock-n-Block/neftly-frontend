import { FC } from 'react';
import cx from 'classnames';
import { H3, Tab } from 'components';

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
};

const HotAuctionCardMobile: FC<Props> = ({
  className,
  nft,
  isUserCanEndAuction,
  isUserCanBuyNft,
  isUserCanEnterInAuction,
  isUserCanPutOnSale,
  isOwner,
  isUserCanRemoveFromSale,
}) => (
  <div className={cx(styles.mobileCard, className)}>
    <div className={styles.imageWrapper}>
      <img src={nft.media} alt="art pic" />
    </div>
    <H3>{nft.name}</H3>
    <AuthorComponent authorPic={nft.creator.avatar} author={nft.creator.name} />
    <PaymentComponent
      className={styles.paymentMobile}
      nft={null}
      isUserCanEndAuction={isUserCanEndAuction}
      isUserCanBuyNft={isUserCanBuyNft}
      isUserCanEnterInAuction={isUserCanEnterInAuction}
      isUserCanPutOnSale={isUserCanPutOnSale}
      isOwner={isOwner}
    />
    <Tab
      className={styles.tabs}
      tabs={[
        {
          title: 'Description',
          body: <DescriptionAndTagsComponent body={nft.description} tags={nft.tags} />,
        },
        {
          title: 'Bid History',
          body: <BiddersComponent bidders={nft.bids} />,
        },
      ]}
    />
    <ViewsAndControlsComponent
      likes={nft.like_count}
      views={1000}
      link="google"
      nft={null}
      isOwner={isOwner}
      isUserCanRemoveFromSale={isUserCanRemoveFromSale}
    />
  </div>
);

export default HotAuctionCardMobile;
