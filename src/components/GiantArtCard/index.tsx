import { FC, useCallback, useState } from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { H2, EllipsisText } from 'components';
import AuthorComponent from 'pages/Home/HotAuction/components/AuthorComponent';
import DescriptionAndTagsComponent from 'pages/Home/HotAuction/components/DescriptionAndTagsComponent';
import PaymentComponent from 'pages/Home/HotAuction/components/PaymentComponent';
import ViewsAndControlsComponent from 'pages/Home/HotAuction/components/ViewsAndControlsComponent';
import { INft, TNullable } from 'typings';
import { useMst } from 'store';
import { useGetUserAccessForNft } from 'hooks';
import { Zoom } from 'assets/img';

import styles from './styles.module.scss';
import useNoScroll from 'hooks/useNoScroll';

type Props = {
  className?: string;
  name: string;
  nft: TNullable<INft>;
  onUpdateNft?: () => void;
};

const GiantCard: FC<Props> = ({ className, nft, onUpdateNft }) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const setScroll = useNoScroll();

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

  const togglePreview = useCallback((state: boolean) => {
    setScroll(state)
    setShowPreview(state)
  }, [setScroll])

  return (
    <div className={cx(styles.giantCard, className)}>
      <div className={styles.contentWrapper}>
        {nft?.format === 'image' && (
          <>
            <div className={styles.contentOverlay}>
              <div className={styles.zoomWrapper}>
                <Zoom />
              </div>
            </div>
            <div className={`${styles.previewBlock} ${showPreview && styles.fullscreen}`}>
              <button className={styles.mediaContentBackground} onClick={() => togglePreview(false)} type='button'> </button>
              <button className={styles.mediaContentWrapper} onClick={() => togglePreview(true)} type='button'>
                <img className={styles.mediaContent} src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
              </button>
            </div>
          </>
        )}
        {nft?.format === 'video' &&
          (nft.animation ? (
            <video className={styles.mediaContent} controls>
              <source src={nft.animation} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
              <track kind="captions" />
            </video>
          ) : (
            <img className={styles.mediaContent} src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
          ))}
        {nft?.format === 'audio' &&
          (nft.animation ? (
            <>
              <img className={styles.mediaContent} src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
              <audio controls>
                <source
                  src={nft.animation}
                // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                />
                <track kind="captions" />
              </audio>
            </>
          ) : (
            <img className={styles.mediaContent} src={nft.media || '/images/content/card-pic-6.jpg'} alt="Card" />
          ))}
      </div>
      <div className={styles.cardInfo}>
        <EllipsisText className={styles.cardName}>
          <H2>{nft?.name || ''}</H2>
        </EllipsisText>
        <ViewsAndControlsComponent
          className={styles.detailedViewsAndControl}
          likes={nft?.like_count || 0}
          inStock={nft?.available || 0}
          nft={nft}
          isOwner={isOwner}
          isUserCanRemoveFromSale={isUserCanRemoveFromSale}
          isWrongChain={isWrongChain}
          isUserCanChangePrice={isUserCanChangePrice}
        />
        {!isWrongChain ? (
          <PaymentComponent
            nft={nft}
            onUpdateNft={onUpdateNft}
            isUserCanEndAuction={isUserCanEndAuction}
            isUserCanBuyNft={isUserCanBuyNft}
            isUserCanEnterInAuction={isUserCanEnterInAuction}
            isUserCanPutOnSale={isUserCanPutOnSale}
            isOwner={isOwner}
          />
        ) : null}
        <AuthorComponent creator={nft?.creator} owners={nft?.owners} />
        <DescriptionAndTagsComponent tags={nft?.tags || []} body={nft?.description || ''} />
      </div>
    </div >
  );
};

export default observer(GiantCard);
