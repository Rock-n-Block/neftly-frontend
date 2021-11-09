import {FC, useCallback, useEffect, useState} from 'react';
import cx from 'classnames';
import {H2, Select} from 'components';
import {storeApi} from 'services';
import CollectionCard from "./CollectionCard";
// import mockData from './mockCollections';

import styles from './styles.module.scss';
// import TitleDropdown from "../../../components/TitleDropdown";
import {OptionType} from "typings";

type Props = {
  className?: string;
};
const dropDownOptions: OptionType[] = [
  {
    label: 'last 1 day',
    value: '1'
  },
  {
    label: 'last 3 days',
    value: '3'
  },
  {
    label: 'last month',
    value: '30'
  },
]
const HotCollections: FC<Props> = ({className}) => {
  const [collections, setCollections] = useState<any[]>([]);
  const [period, setPeriod] = useState<OptionType>(dropDownOptions[0]);
  const fetchHotCollections = useCallback(() => {
    storeApi.getCollections().then(({data}: any) => setCollections(data));
  }, []);

  const handlePeriodChange = useCallback((value: any) => {
    setPeriod(value || {
      value: '',
      label: '',
    });
  }, []);

  useEffect(() => {
    fetchHotCollections();
  }, [fetchHotCollections]);
  return (
    <div className={cx(styles.hotCollections, className)}>
      <div className={styles.title}>
        <H2>
          Top collections over{' '}
          {/*<span className={styles.gradientTitle}>last {period} {period === 1 ? 'day' : 'days'}</span>*/}
          {/*<TitleDropdown options={dropDownOptions} className={styles.gradientTitle}/>*/}
          <Select value={period} onChange={handlePeriodChange} options={dropDownOptions} classNameValueContainer={styles.selectValueContainer} classNameControl={styles.selectControl} classNameSingleValue={styles.gradientTitle}/>
        </H2>
      </div>
      <ol className={styles.collectionsWrapper}>
        {collections.map((collection, index) => (
          <CollectionCard avatar={collection.avatar} isVerified={collection.is_verified} id={collection.id}
                          index={index + 1} name={collection.name} price={collection.price}/>
        ))}

      </ol>
    </div>
  );
};

export default HotCollections;
