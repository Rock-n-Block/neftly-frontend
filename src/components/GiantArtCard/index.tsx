import { FC } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { H2 } from 'components';
import AuthorComponent from 'pages/Home/HotAuction/components/AuthorComponent';
import DescriptionAndTagsComponent from 'pages/Home/HotAuction/components/DescriptionAndTagsComponent';
import PaymentComponent from 'pages/Home/HotAuction/components/PaymentComponent';
import ViewsAndControlsComponent from 'pages/Home/HotAuction/components/ViewsAndControlsComponent';
import { INft } from 'typings';
import { useMst } from '../../store';
import { useGetUserAccessForNft } from 'hooks';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  name: string;
  views: number;
  growth: number;
  nft: INft | null;
  onUpdateNft?: () => void;
};

const GiantCard: FC<Props> = ({ className, views, growth, nft, onUpdateNft }) => {
  const { user } = useMst();
  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
    isUserCanRemoveFromSale,
  } = useGetUserAccessForNft(nft, user.id, user.address);
  return (
    <div className={cx(styles.giantCard, className)}>
      <img src={nft?.media || ''} alt="" />
      <div className={styles.cardInfo}>
        <H2>{nft?.name || ''}</H2>
        <ViewsAndControlsComponent
          className={styles.detailedViewsAndControl}
          likes={nft?.like_count || 0}
          views={views}
          inStock={nft?.available || 0}
          isLiked={nft?.is_liked}
          nft={nft}
          isOwner={isOwner}
          isUserCanRemoveFromSale={isUserCanRemoveFromSale}
        />
        <PaymentComponent
          growth={growth}
          nft={nft}
          onUpdateNft={onUpdateNft}
          isUserCanEndAuction={isUserCanEndAuction}
          isUserCanBuyNft={isUserCanBuyNft}
          isUserCanEnterInAuction={isUserCanEnterInAuction}
          isUserCanPutOnSale={isUserCanPutOnSale}
          isOwner={isOwner}
        />
        <AuthorComponent author={nft?.creator.name || ''} authorPic={nft?.creator.avatar || ''} />
        <DescriptionAndTagsComponent tags={nft?.tags || []} body={nft?.description || ''} />
      </div>
    </div>
  );
};

export default observer(GiantCard);
