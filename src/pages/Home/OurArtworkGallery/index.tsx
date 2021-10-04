import { FC } from 'react';
import cx from 'classnames';
import { ArtCard, Button, H2 } from 'components';

import { data } from './mockData';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const OurArtworkGallery: FC<Props> = ({ className }) => (
  <div className={cx(styles.ourArtworkGallery, className)}>
    <div className={styles.title}>
      <H2>
        Our Artwork <span className={styles.gradientTitle}>Gallery</span>
      </H2>
    </div>
    <div className={styles.artCardsWrapper}>
      {data.map((art) => {
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
        } = art;
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
    <div className={styles.viewMoreBtnWrapper}>
      <Button color="outline" className={styles.viewMoreBtn}>
        View More
      </Button>
    </div>
  </div>
);

export default OurArtworkGallery;
