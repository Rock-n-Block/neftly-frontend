import { FC } from 'react';
import cx from 'classnames';
import { H3, Tab } from 'components';

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
  // eslint-disable-next-line react/no-unused-prop-types
  auctionEndingTime: any;
  bidders: any[];
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
};

const HotAuctionCardMobile: FC<Props> = ({
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
  <div className={cx(styles.mobileCard, className)}>
    <div className={styles.imageWrapper}>
      <img src={artPic} alt="art pic" />
    </div>
    <H3>{title}</H3>
    <AuthorComponent authorPic={authorPic} author={author} />
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
          body: <DescriptionAndTagsComponent body={body} tags={tags} />,
        },
        {
          title: 'Bid History',
          body: <BiddersComponent bidders={bidders} />,
        },
      ]}
    />
    <ViewsAndControlsComponent
      likes={likes}
      views={views}
      likeAction={() => alert('likeAction')}
      link="google"
      nft={null}
      isOwner={isOwner}
      isUserCanRemoveFromSale={isUserCanRemoveFromSale}
    />
  </div>
);

export default HotAuctionCardMobile;
