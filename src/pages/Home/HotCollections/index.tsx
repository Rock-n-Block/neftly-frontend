import {FC, useCallback, useEffect, useState} from 'react';
import cx from 'classnames';
import {H2, TitleDropdown} from 'components';
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
    //TODO: add period.value
    storeApi.getCollections().then(({data}: any) => setCollections(data));
  }, []);


  useEffect(() => {
    fetchHotCollections();
  }, [fetchHotCollections]);
  return (
    <div className={cx(styles.hotCollections, className)}>
      <div className={styles.titleWrapper}>
        <H2 className={styles.title} align="center">
          Top collections over{' '}
          <TitleDropdown value={period} setValue={setPeriod} options={dropDownOptions}/>
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
