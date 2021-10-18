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
  growth: number;
  nft: INft | null;
  onUpdateNft?: () => void;
};

const GiantCard: FC<Props> = ({ className, growth, nft, onUpdateNft }) => {
  const { user } = useMst();
  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
    isUserCanRemoveFromSale,
    isWrongChain,
  } = useGetUserAccessForNft(nft, user.id, user.address);
  return (
    <div className={cx(styles.giantCard, className)}>
      {nft?.format === 'image' && (
        <img src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
      )}
      {nft?.format === 'video' &&
        (nft.animation ? (
          <video controls>
            <source src={nft.animation} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            <track kind="captions" />
          </video>
        ) : (
          <img src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
        ))}
      {nft?.format === 'audio' &&
        (nft.animation ? (
          <>
            <img src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
            <audio controls>
              <source
                src={nft.animation}
                // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
              />
              <track kind="captions" />
            </audio>
          </>
        ) : (
          <img src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
        ))}
      <div className={styles.cardInfo}>
        <H2>{nft?.name || ''}</H2>
        <ViewsAndControlsComponent
          className={styles.detailedViewsAndControl}
          likes={nft?.like_count || 0}
          inStock={nft?.available || 0}
          nft={nft}
          isOwner={isOwner}
          isUserCanRemoveFromSale={isUserCanRemoveFromSale}
          isWrongChain={isWrongChain}
        />
        {!isWrongChain ? (
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
        ) : null}
        <AuthorComponent author={nft?.creator.name || ''} authorPic={nft?.creator.avatar || ''} />
        <DescriptionAndTagsComponent tags={nft?.tags || []} body={nft?.description || ''} />
      </div>
    </div>
  );
};

export default observer(GiantCard);
