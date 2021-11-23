import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { ArtCard, Carousel, H3, H4 } from 'components/index';
import { useGetSlideToShow } from 'hooks';
import { storeApi } from 'services';

import styles from './LiveAuction.module.scss';

interface IProps {
  className?: string;
}

interface IHotBidShorted {
  id: string | number;
  image: string;
  name: string;
  price: string;
  asset: string;
  inStockNumber: string;
  author: string;
  authorAvatar: string;
  authorId: string;
  likesNumber: number;
  tags: string[];
}

const LiveAuction: React.FC<IProps> = ({ className }) => {
  const numberOfSlide = useGetSlideToShow();
  const [auctions, setAuctions] = useState<IHotBidShorted[]>([]);
  const getHotBids = useCallback(() => {
    storeApi.getHotBids().then(({ data }) => {
      const formatedData = [...data].map((hotBid: any) => {
        const { id, media, name, price, currency, available, creator, like_count, tags } = hotBid;
        return {
          id,
          image: media,
          name,
          price: price || 0,
          asset: currency.symbol,
          inStockNumber: available,
          author: creator.name,
          authorAvatar: creator.avatar,
          authorId: creator.id,
          likesNumber: like_count,
          tags,
        } as IHotBidShorted;
      });

      setAuctions(formatedData);
    });
  }, []);

  useEffect(() => {
    getHotBids();
  }, [getHotBids]);
  return (
    <div className={cn(className, styles.liveAuction)}>
      <H3 className={styles.title}>Live Auction Today</H3>
      {auctions.length ? (
        <Carousel slidesToShow={numberOfSlide}>
          {auctions.map((artCard) => {
            const {
              id,
              image,
              name,
              price,
              asset,
              inStockNumber,
              author,
              authorAvatar,
              authorId,
              likesNumber,
              tags,
            } = artCard;
            return (
              <div className={styles.liveCard}>
                <ArtCard
                  artId={id}
                  key={id}
                  imageMain={image}
                  name={name}
                  price={price}
                  asset={asset}
                  inStockNumber={inStockNumber}
                  author={author}
                  authorAvatar={authorAvatar}
                  authorId={authorId}
                  likesNumber={likesNumber}
                  tags={tags}
                />
              </div>
            );
          })}
        </Carousel>
      ) : (
        <H4 className={styles.noItems}>No Active Auctions</H4>
      )}
    </div>
  );
};

export default LiveAuction;
