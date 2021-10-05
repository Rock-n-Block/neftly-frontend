import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { ArtCard, Button, H2, Loader } from 'components';
import { storeApi } from 'services';

// import { data as mockData } from './mockData';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const OurArtworkGallery: FC<Props> = ({ className }) => {
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const [art, setArt] = useState<any>([]);

  const fetchSearch = useCallback((page: number, refresh?: boolean) => {
    setLoading(true);
    storeApi
      .getSearchResults(
        { text: '', page },
        {
          type: 'items',
          order_by: 'home.discover.filter.recently_added',
          tags: 'All items',
          max_price: [0],
          currency: ['bnb', 'busd', 'wbnb'],
        },
      )
      .then(({ data }: any) => {
        if (refresh) {
          setArt(data.items);
        } else {
          setArt((prev: any) => [...prev, ...data.items]);
        }
        setAllPages(Math.ceil(data.total_tokens / 8));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (currentPage <= allPages) {
      fetchSearch(currentPage, false);
    }
  }, [currentPage, allPages, fetchSearch]);

  useEffect(() => {
    fetchSearch(1, true);
  }, [fetchSearch]);

  useEffect(() => {
    if (currentPage !== 1) {
      handleLoadMore();
    }
  }, [handleLoadMore, currentPage]);

  return (
    <div className={cx(styles.ourArtworkGallery, className)}>
      <div className={styles.title}>
        <H2>
          Our Artwork <span className={styles.gradientTitle}>Gallery</span>
        </H2>
      </div>
      <div className={styles.artCardsWrapper}>
        {art.map((artPiece: any) => {
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
          } = artPiece;
          return (
            <ArtCard
              key={name}
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
      {isLoading && <Loader className={styles.loader} />}
      {(!isLoading || currentPage >= allPages) && (
        <div className={styles.viewMoreBtnWrapper}>
          <Button
            color="outline"
            className={styles.viewMoreBtn}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default OurArtworkGallery;
