import { FC } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import HotAuctionCardDesktop from '../HotAuctionCardDesktop';
import HotAuctionCardMobile from '../HotAuctionCardMobile';
import { useMst } from '../../../../../store';
import { useGetUserAccessForNft } from 'hooks';

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
}) => {
  const { user } = useMst();
  // TODO: Пропихнуть целый объект токена, и закинуть его в хук вместо null
  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
  } = useGetUserAccessForNft(null, user.id, user.address);
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
        isUserCanEndAuction={isUserCanEndAuction}
        isUserCanBuyNft={isUserCanBuyNft}
        isUserCanEnterInAuction={isUserCanEnterInAuction}
        isUserCanPutOnSale={isUserCanPutOnSale}
        isOwner={isOwner}
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
        isUserCanEndAuction={isUserCanEndAuction}
        isUserCanBuyNft={isUserCanBuyNft}
        isUserCanEnterInAuction={isUserCanEnterInAuction}
        isUserCanPutOnSale={isUserCanPutOnSale}
        isOwner={isOwner}
      />
    </div>
  );
};

export default observer(HotAuctionCard);
