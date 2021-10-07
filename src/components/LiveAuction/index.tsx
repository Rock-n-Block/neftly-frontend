import { ArtCard, Carousel, H3 } from 'components/index';
import mockData from './mockData';
import { useGetSlideToShow } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './LiveAuction.module.scss';
import { storeApi } from 'services';

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
  likesNumber: number;
  tags: string[];
}

const LiveAuction: React.FC<IProps> = ({ className }) => {
  const numberOfSlide = useGetSlideToShow();
  const [tokens, setTokens] = useState<IHotBidShorted[]>([]);
  // in API live auction is similar to hot bids
  const getHotBids = useCallback(() => {
    storeApi.getHotBids().then(({ data }) => {
      // TODO: remove mockData and create interface IHotBid
      const formatedData = [...mockData, ...data].map((hotBid: any) => {
        return {
          id: hotBid.id,
          image: hotBid.media,
          name: hotBid.name,
          price: hotBid.price || 0,
          asset: hotBid.currency.symbol,
          inStockNumber: hotBid.available,
          author: hotBid.creator.name,
          authorAvatar: hotBid.creator.avatar,
          likesNumber: hotBid.like_count,
          tags: hotBid.tags,
        } as IHotBidShorted;
      });

      setTokens(formatedData);
    });
  }, []);

  useEffect(() => {
    getHotBids();
  }, [getHotBids]);

  return (
    <div className={cn(className, styles.liveAuction)}>
      <H3 className={styles.title}>Live Auction Today</H3>
      {!!tokens.length && (
        <Carousel slidesToShow={numberOfSlide}>
          {tokens.map((artCard) => {
            const {
              id,
              image,
              name,
              price,
              asset,
              inStockNumber,
              author,
              authorAvatar,
              likesNumber,
              tags,
            } = artCard;
            return (
              <ArtCard
                artId={id}
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
        </Carousel>
      )}
    </div>
  );
};

export default LiveAuction;
