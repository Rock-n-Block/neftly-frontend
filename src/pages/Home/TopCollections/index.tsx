import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { H2 } from 'components';
import { activityApi } from 'services';
import CollectionCard from './CollectionCard';

import styles from './styles.module.scss';
import { OptionType } from 'typings';
import TitleDropdown from "./TitleDropdown";
import { toFixed } from 'utils';

type Props = {
  className?: string;
};
const dropDownOptions: OptionType[] = [
  {
    label: '1 day',
    value: 'day',
  },
  {
    label: '7 days',
    value: 'week',
  },
  {
    label: 'month',
    value: 'month',
  },
];
const TopCollections: FC<Props> = ({ className }) => {
  const [collections, setCollections] = useState<any[]>([]);
  const [period, setPeriod] = useState<OptionType>(dropDownOptions[0]);
  const fetchTopCollections = useCallback(() => {
    //TODO: add fetchTopCollections request
    activityApi
      .getTopUsers({ type: 'seller', sortPeriod: period.value })
      .then(({ data }: any) => setCollections(data));
  }, [period.value]);

  useEffect(() => {
    fetchTopCollections();
  }, [fetchTopCollections]);
  return (
    <div className={cx(styles.topCollections, className)}>
      <H2 className={styles.title} align="center">
        Top collections over
        <TitleDropdown value={period} setValue={setPeriod} options={dropDownOptions} />
      </H2>
      <div className={`${styles.collections} ${collections.length !== 0 && styles.open}`}>

        <ol className={styles.collectionsWrapper}>
          {collections.map((collection, index) => (
            <CollectionCard
              key={`collection-${collection.name}`}
              avatar={collection.avatar}
              isVerified={collection.is_verified}
              id={collection.id}
              index={index + 1}
              name={collection.name}
              price={collection.price}
              profitIncrease={toFixed(12345.678, 2)}
            />
          ))}
        </ol>
      </div>
    </div >
  );
};

export default TopCollections;
