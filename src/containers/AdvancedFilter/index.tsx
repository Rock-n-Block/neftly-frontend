import { FC, useCallback, useState } from 'react';
import { cross } from 'assets/img';
import cx from 'classnames';
import { Button, H3, RangePicker, Select, Text } from 'components';

import FilterTag from './FilterTag';

import styles from './styles.module.scss';

const filterSelectCurrencyOptions = [
  {
    value: 'eth',
    label: 'ETH',
  },
  {
    value: 'usdt',
    label: 'USDT',
  },
  {
    value: 'doge',
    label: 'DOGE',
  },
];

const filterSelectLikesOptions = [
  {
    value: 'leastLikes',
    label: 'Least Likes',
  },
  {
    value: 'mostLikes',
    label: 'Most Likes',
  },
];

const filterSelectArtistsOptions = [
  {
    value: 'verified',
    label: 'Verified Professionals',
  },
  {
    value: 'unverified',
    label: 'Beginners',
  },
];

type Props = {
  className?: string;
  isMobile?: boolean;
  changeFilters?: (key: string, value: string) => void;
};

type AppliedFilterValueType =
  | {
      label: string;
      value: string;
    }
  | string;

const AdvancedFilter: FC<Props> = ({ isMobile, className, changeFilters }) => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, AppliedFilterValueType>>({});

  const [filterRange, setFilterRange] = useState(0.1);
  const handleFilterRange = useCallback(
    (value) => {
      setFilterRange(value);
      if (changeFilters) changeFilters('max_price', value);
    },
    [changeFilters],
  );

  const [filterCurrency, setFilterCurrency] = useState();
  const handleFilterCurrency = useCallback(
    (value) => {
      setFilterCurrency(value);
      setAppliedFilters({ ...appliedFilters, currency: value });
      if (changeFilters) changeFilters('currency', value.value);
    },
    [appliedFilters, changeFilters],
  );

  const [filterLikes, setFilterLikes] = useState();
  const handleFilterLikes = useCallback(
    (value) => {
      setFilterLikes(value);
      setAppliedFilters({ ...appliedFilters, likes: value });
    },
    [appliedFilters],
  );

  const [filterArtists, setFilterArtists] = useState();
  const handleFilterArtists = useCallback(
    (value) => {
      setFilterArtists(value);
      setAppliedFilters({ ...appliedFilters, artists: value });
      if (changeFilters) changeFilters('is_verificated', value.value);
    },
    [appliedFilters, changeFilters],
  );
  return (
    <div className={cx(styles.advancedFilter, { [styles.mobile]: isMobile }, className)}>
      {isMobile && (
        <div className={styles.advancedFilterFlex}>
          <H3>Advanced Filter</H3>
          <Button color="outline" className={styles.advancedFilterCloseBtn}>
            <img src={cross} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.advancedFilterFlex}>
        <Text>Applied Filters</Text>
        <Button color="transparent">
          <Text color="gray">Clear all</Text>
        </Button>
      </div>
      <div className={styles.tagContainer}>
        {Object.values(appliedFilters).map((filter: any) => {
          return (
            <FilterTag
              className={styles.filterTag}
              label={typeof filter === 'string' ? filter : filter.label}
            />
          );
        })}
      </div>
      <div>
        <Text color="gray">Price Range</Text>
        <RangePicker
          className={styles.rangeFilter}
          onChange={handleFilterRange}
          value={filterRange}
          min={0.01}
          max={10}
          step={0.01}
        />
      </div>
      <div>
        <Text color="gray" size="m">
          Currency
        </Text>
        <Select
          onChange={handleFilterCurrency}
          value={filterCurrency}
          options={filterSelectCurrencyOptions}
        />
      </div>
      <div>
        <Text color="gray" size="m">
          Likes
        </Text>
        <Select
          onChange={handleFilterLikes}
          value={filterLikes}
          options={filterSelectLikesOptions}
        />
      </div>
      <div>
        <Text color="gray" size="m">
          Artists
        </Text>
        <Select
          onChange={handleFilterArtists}
          value={filterArtists}
          options={filterSelectArtistsOptions}
        />
      </div>
      {isMobile && (
        <>
          <Button isFullWidth>
            <Text color="black" weight="bold" size="m">
              Apply
            </Text>
          </Button>
          <Button isFullWidth color="outline">
            <Text color="white" weight="bold" size="m">
              Cancel
            </Text>
          </Button>
        </>
      )}
    </div>
  );
};

export default AdvancedFilter;
