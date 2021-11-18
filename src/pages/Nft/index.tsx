import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { ArtCard, Control, GiantCard, H3 } from 'components';
import { storeApi } from 'services/api';
import { useMst } from 'store';
import { ICurrency, INft, TNullable } from 'typings';
import { useLoadMore, useFetchNft } from 'hooks';
import { LoadMore } from 'containers';

import PriceHistory from './PriceHistory';

import styles from './styles.module.scss';
import { routes } from 'appConstants';
// import GridLayer, { EGridJustify } from 'containers/GridLayer';

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

  const wrapRef = useRef<HTMLDivElement>(null);

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
        <PriceHistory
          tokenId={id}
          history={nft?.history || []}
          currency={nft?.currency as ICurrency}
        />
        <div className={styles.relatedArtwork}>
          <H3>Related Artwork</H3>
          <LoadMore
            itemsLength={nftCards.length}
            isLoading={isLoading}
            currentPage={page}
            allPages={allPages}
            handleLoadMore={handleLoadMore}
          >
            <div ref={wrapRef} className={styles.artCardsWrapper}>
              {/* <GridLayer gap={40} wrapperRef={wrapRef} minWidth={300} minHeight={400} justify={EGridJustify.center}> */}
              {nftCards
                .filter((art) => art.id !== Number(id))
                .map((art) => {
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
            {/* </GridLayer> */}
          </LoadMore>
        </div>
      </div>
    </div>
  );
});

export default DetailArtwork;
