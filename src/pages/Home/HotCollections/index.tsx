import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { ArtCard, H2 } from 'components';
import { storeApi } from 'services';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const HotCollections: FC<Props> = ({ className }) => {
  const [collections, setCollections] = useState([]);
  const fetchHotCollections = useCallback(() => {
    storeApi.getCollections().then(({ data }: any) => setCollections(data));
  }, []);

  useEffect(() => {
    fetchHotCollections();
  }, [fetchHotCollections]);
  return (
    <div className={cx(styles.hotCollections, className)}>
      <div className={styles.title}>
        <H2>
          Hot <span className={styles.gradientTitle}>Collections</span>
        </H2>
      </div>
      <div className={styles.artCardsWrapper}>
        {collections
          ? collections.map((art: any) => {
              const { avatar, tokens, name, price, asset, creator, id } = art;
              return (
                <ArtCard
                  artId={id}
                  key={name}
                  type="Medium"
                  imageMain={avatar}
                  imageSecondaryOne={tokens[0]}
                  imageSecondaryTwo={tokens[1]}
                  imageSecondaryThree={tokens[2]}
                  name={name}
                  price={price}
                  asset={asset}
                  allArtNumber={tokens.length}
                  author={creator.name}
                  authorAvatar={creator.avatar}
                  authorId={creator.id}
                  isCollection
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default HotCollections;
