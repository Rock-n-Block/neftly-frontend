import { ArtCard, Carousel, H3 } from 'components/index';
import { data as mockData } from 'pages/Discover/mockData';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { useGetSlideToShow } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './LiveAuction.module.scss';
import { storeApi } from 'services';

interface IProps {
  className?: string;
}

interface IHotBid {
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
  const [tokens, setTokens] = useState<IHotBid[]>([]);
  // in API live auction is similar to hot bids
  const getHotBids = useCallback(() => {
    storeApi.getHotBids().then(({ data }) => {
      // TODO: remove mockData
      setTokens([...mockData, ...data]);
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
          {tokens.map((artCard, index) => {
            const {
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
              <Link to={`${routes.nft.link}/${index}`}>
                <ArtCard
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
              </Link>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default LiveAuction;
