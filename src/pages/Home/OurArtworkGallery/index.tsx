import { FC, useState } from 'react';
import cx from 'classnames';
import { ArtCard, Button, H2, Loader } from 'components';

import styles from './styles.module.scss';
import { useFetchNft, useLoadMore } from 'hooks';

type Props = {
  className?: string;
};

const OurArtworkGallery: FC<Props> = ({ className }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { page, handleLoadMore } = useLoadMore(1);

  const { allPages, nftCards } = useFetchNft({
    setLoading: setIsLoading,
    page,
    sort: 'items',
    on_sale: true,
  });
  // const handleLoadMore = useCallback(() => {
  //   setCurrentPage((prevState) => prevState + 1);
  // }, []);
  return (
    <div className={cx(styles.ourArtworkGallery, className)}>
      <div className={styles.title}>
        <H2>
          Our Artwork <span className={styles.gradientTitle}>Gallery</span>
        </H2>
      </div>
      <div className={styles.artCardsWrapper}>
        {nftCards.map((artPiece: any) => {
          const {
            id,
            media,
            name,
            price,
            highest_bid,
            minimal_bid,
            currency,
            creator,
            like_count,
            available,
            tags,
          } = artPiece;
          return (
            <ArtCard
              artId={id}
              key={name}
              imageMain={media}
              name={name}
              price={price || highest_bid || minimal_bid}
              asset={currency.symbol.toUpperCase()}
              inStockNumber={available}
              author={creator.name}
              authorAvatar={creator.avatar}
              likesNumber={like_count}
              tags={tags}
            />
          );
        })}
      </div>
      {isLoading && <Loader className={styles.loader} />}
      {(!isLoading || page >= allPages) && (
        <div className={styles.viewMoreBtnWrapper}>
          <Button color="outline" className={styles.viewMoreBtn} onClick={handleLoadMore}>
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default OurArtworkGallery;
