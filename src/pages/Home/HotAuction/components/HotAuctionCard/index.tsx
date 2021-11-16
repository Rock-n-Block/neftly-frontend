import { FC } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import HotAuctionCardDesktop from '../HotAuctionCardDesktop';
import HotAuctionCardMobile from '../HotAuctionCardMobile';
import { useMst } from '../../../../../store';
import { useGetUserAccessForNft } from 'hooks';
import { INft } from 'typings';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  nft: INft;
};

const HotAuctionCard: FC<Props> = ({ className, nft }) => {
  const { user } = useMst();
  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
    isUserCanRemoveFromSale,
    isWrongChain,
    isUserCanChangePrice
  } = useGetUserAccessForNft(nft, user.id, user.address);
  return (
    <div className={cx(styles.hotAuctionCard, className)}>
      <HotAuctionCardDesktop
        className={styles.desktopAuctionCard}
        nft={nft}
        isUserCanEndAuction={isUserCanEndAuction}
        isUserCanBuyNft={isUserCanBuyNft}
        isUserCanEnterInAuction={isUserCanEnterInAuction}
        isUserCanPutOnSale={isUserCanPutOnSale}
        isOwner={isOwner}
        isUserCanRemoveFromSale={isUserCanRemoveFromSale}
        isWrongChain={isWrongChain}
        isUserCanChangePrice={isUserCanChangePrice}
        tooltipPlacement="bottom-right"
      />
      <HotAuctionCardMobile
        className={styles.mobileAuctionCard}
        nft={nft}
        isUserCanEndAuction={isUserCanEndAuction}
        isUserCanBuyNft={isUserCanBuyNft}
        isUserCanEnterInAuction={isUserCanEnterInAuction}
        isUserCanPutOnSale={isUserCanPutOnSale}
        isOwner={isOwner}
        isUserCanRemoveFromSale={isUserCanRemoveFromSale}
        isWrongChain={isWrongChain}
        isUserCanChangePrice={isUserCanChangePrice}
        tooltipPlacement="bottom-right"
      />
    </div>
  );
};

export default observer(HotAuctionCard);
