import { FC } from 'react';
import cx from 'classnames';
import { ArtCard, Button, H2 } from 'components';

import { data } from './mockData';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const HotCollections: FC<Props> = ({ className }) => (
  <div className={cx(styles.hotCollections, className)}>
    <div className={styles.title}>
      <H2>
        Hot <span className={styles.gradientTitle}>Collections</span>
      </H2>
    </div>
    <div className={styles.artCardsWrapper}>
      {data.map((art) => {
        const {
          image,
          imageSecondary1,
          imageSecondary2,
          imageSecondary3,
          name,
          price,
          asset,
          inStockNumber,
          author,
          authorAvatar,
          likesNumber,
        } = art;
        return (
          <ArtCard
            type="Medium"
            imageMain={image}
            imageSecondaryOne={imageSecondary1}
            imageSecondaryTwo={imageSecondary2}
            imageSecondaryThree={imageSecondary3}
            name={name}
            price={price}
            asset={asset}
            inStockNumber={inStockNumber}
            author={author}
            authorAvatar={authorAvatar}
            likesNumber={likesNumber}
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

export default HotCollections;
