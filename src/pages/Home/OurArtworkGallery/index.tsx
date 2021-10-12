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
  const [currentPage, setCurrentPage] = useState(1)

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
