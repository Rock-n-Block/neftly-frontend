import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';
import { ArtCard, Button, Control, GiantCard, H3, H4, Loader } from 'components';
import { observer } from 'mobx-react-lite';
import { storeApi } from 'services/api';
import { useMst } from 'store';
import { ICurrency, INft, TNullable } from 'typings';

import { data as mockData } from './mockdata';
import PriceHistory from './PriceHistory';

import styles from './styles.module.scss';

const breadcrumbs = [
  {
    title: 'Discover',
    url: '/discover',
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
  const [allPages, setAllPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [artWorks, setArtWorks] = useState<INft[]>([]);
  const [isLoadingArtWorks, setLoadingArtWorks] = useState<boolean>(false);

  const getRelatedArtworks = useCallback((page: number) => {
    setLoadingArtWorks(true);
    storeApi
      .getSearchResults({
        type: 'items',
        order_by: 'Recently added',
        tags: 'All items',
        max_price: [2000],
        currency: 'bnb',
        page,
      })
      .then(({ data }: any) => {
        setArtWorks((prev: any) => [...prev, ...data.items]);
        setAllPages(Math.ceil(data.total_tokens / 8));
      })
      .catch((err) => {
        console.log('get artworks', err);
      })
      .finally(() => {
        setLoadingArtWorks(false);
      });
  }, []);

  const handleLoadMore = React.useCallback(() => {
    if (currentPage <= allPages) {
      getRelatedArtworks(currentPage);
    }
  }, [currentPage, allPages, getRelatedArtworks]);

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

  useEffect(() => getRelatedArtworks(1), [getRelatedArtworks]);

  useEffect(() => {
    if (currentPage !== 1) {
      handleLoadMore();
    }
  }, [handleLoadMore, currentPage]);
  console.log(nft, 'nft 9999999');
  return (
    <div className={cx(styles.detailArtwork, className)}>
      <div className={styles.detailArtworkContent}>
        <Control item={breadcrumbs} />
        <GiantCard
          name={nft?.name || ''}
          growth={mockData.growth}
          nft={nft}
          onUpdateNft={getItem}
        />
        <PriceHistory tokenId={id} currency={nft?.currency as ICurrency} />
        <div className={styles.relatedArtwork}>
          <H3>Related Artwork</H3>
          <div className={styles.artCardsWrapper}>
            {artWorks.map((art) => {
              const {
                id: artId,
                media: image,
                name,
                price,
                available: inStockNumber,
                creator: { name: author },
                creator: { avatar: authorAvatar },
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
                  likesNumber={likesNumber}
                  tags={tags}
                />
              );
            })}
          </div>
          {!artWorks.length && !isLoadingArtWorks ? <H4>No matches</H4> : ''}
          {isLoadingArtWorks ? <Loader className={styles.loader} /> : ''}
          {currentPage < allPages && !isLoadingArtWorks && artWorks.length ? (
            <div className={styles.viewMoreBtnWrapper}>
              <Button
                color="outline"
                className={styles.viewMoreBtn}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
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
