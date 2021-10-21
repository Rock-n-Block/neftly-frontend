import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';
import { ArtCard, Button, Control, GiantCard, H3, H4, Loader } from 'components';
import { observer } from 'mobx-react-lite';
import { storeApi } from 'services/api';
import { useMst } from 'store';
import { ICurrency, INft, TNullable } from 'typings';
import { useLoadMore, useFetchNft } from 'hooks';

import PriceHistory from './PriceHistory';

import styles from './styles.module.scss';
import { routes } from 'appConstants';

const breadcrumbs = [
  {
    title: 'Discover',
    url: routes.discover.root,
  },
  {
    title: 'Artwork Details',
  },
];

type Props = {
  className?: string;
};

const DetailArtwork: FC<Props> = observer(({ className }) => {
  const {
    modals: { sell, remove },
  } = useMst();
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const [nft, setNft] = useState<TNullable<INft>>(null);

  const { page, handleLoadMore } = useLoadMore(1);

  const [allPages, , nftCards, isLoading] = useFetchNft({
    page,
    sort: 'items',
    on_sale: true,
  });

  const getItem = React.useCallback(() => {
    storeApi
      .getToken(id)
      .then(({ data }) => setNft(data))
      .catch((err) => {
        history.push('/');
        console.error(err);
      });
  }, [id, history]);

  useEffect(() => getItem(), [getItem]);

  useEffect(() => {
    if (
      sell.checkout.isSuccess ||
      sell.placeBid.isSuccess ||
      remove.isSuccess ||
      sell.putOnSale.isSuccess
    ) {
      getItem();
    }
  }, [
    sell.checkout.isSuccess,
    sell.placeBid.isSuccess,
    getItem,
    remove.isSuccess,
    sell.putOnSale.isSuccess,
  ]);

  return (
    <div className={cx(styles.detailArtwork, className)}>
      <div className={styles.detailArtworkContent}>
        <Control item={breadcrumbs} />
        <GiantCard name={nft?.name || ''} nft={nft} onUpdateNft={getItem} />
        <PriceHistory tokenId={id} currency={nft?.currency as ICurrency} />
        <div className={styles.relatedArtwork}>
          <H3>Related Artwork</H3>
          <div className={styles.artCardsWrapper}>
            {nftCards.map((art) => {
              const {
                id: artId,
                media: image,
                name,
                price,
                available: inStockNumber,
                creator: { name: author },
                creator: { avatar: authorAvatar },
                creator: { id: authorId },
                tags,
                like_count: likesNumber,
                currency: { symbol: asset },
              } = art;
              return (
                <ArtCard
                  key={`nft_card_${artId}`}
                  className={styles.artCard}
                  artId={artId}
                  imageMain={image}
                  name={name}
                  price={price}
                  asset={asset}
                  inStockNumber={inStockNumber}
                  author={author}
                  authorAvatar={authorAvatar}
                  authorId={authorId.toString()}
                  likesNumber={likesNumber}
                  tags={tags}
                />
              );
            })}
          </div>
          {!nftCards.length && !isLoading ? <H4>No matches</H4> : ''}
          {isLoading ? <Loader className={styles.loader} /> : ''}
          {page < allPages && !isLoading && nftCards.length ? (
            <div className={styles.viewMoreBtnWrapper}>
              <Button color="outline" className={styles.viewMoreBtn} onClick={handleLoadMore}>
                View More
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default DetailArtwork;
