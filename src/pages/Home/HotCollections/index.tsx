import {FC, useCallback, useEffect, useState} from 'react';
import cx from 'classnames';
import {H2} from 'components';
import {storeApi} from 'services';
import CollectionCard from "./CollectionCard";
import mockData from './mockCollections';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const HotCollections: FC<Props> = ({className}) => {
  const [, setCollections] = useState([]);
  const [period,] = useState(1);
  const fetchHotCollections = useCallback(() => {
    storeApi.getCollections().then(({data}: any) => setCollections(data));
  }, []);

  useEffect(() => {
    fetchHotCollections();
  }, [fetchHotCollections]);
  return (
    <div className={cx(styles.hotCollections, className)}>
      <div className={styles.title}>
        <H2>
          Top collections over <span
          className={styles.gradientTitle}>last {period} {period === 1 ? 'day' : 'days'}</span>
        </H2>
      </div>
      <ol className={styles.collectionsWrapper}>
        {mockData.map((collection,index) => (
          <CollectionCard avatar={collection.avatar} isVerified={collection.is_verified} id={collection.id} index={index+1} name={collection.name} price={collection.eth}/>
        ))}

      </ol>
    </div>
  );
};

export default HotCollections;
