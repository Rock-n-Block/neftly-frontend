import { FC, useCallback, useState } from 'react';
import { cross } from 'assets/img';
import cx from 'classnames';
import { Button, H3, RangePicker, Select, Text, TextInput } from 'components';

import FilterTag from './FilterTag';

import styles from './styles.module.scss';

const defaultColorFilterValues = [
  {
    value: '#018DF0',
    label: 'Blue Color',
  },
  {
    value: '#EF466F',
    label: 'Red Color',
  },
  {
    value: '#FFD166',
    label: 'Yellow Color',
  },
  {
    value: '#FF72D2',
    label: 'Pink Color',
  },
  {
    value: '#C379F6',
    label: 'Purple Color',
  },
  {
    value: '#01C5BA',
    label: 'Green Color',
  },
  {
    value: '#FFFFFF',
    label: 'White Color',
  },
];

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
  {
    value: 'unverified',
    label: 'Beginners',
  },
];

type Props = {
  className?: string;
  isMobile?: boolean;
};

type AppliedFilterValueType =
  | {
      label: string;
      value: string;
    }
  | string;

const AdvancedFilter: FC<Props> = ({ isMobile, className }) => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, AppliedFilterValueType>>({});

  const [filterRange, setFilterRange] = useState(0.1);
  const handleFilterRange = useCallback((value) => {
    setFilterRange(value);
  }, []);

  const [filterCurrency, setFilterCurrency] = useState();
  const handleFilterCurrency = useCallback(
    (value) => {
      setFilterCurrency(value);
      setAppliedFilters({ ...appliedFilters, currency: value });
    },
    [appliedFilters],
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
    },
    [appliedFilters],
  );

  const [filterColorScheme, setFilterColorScheme] = useState('');
  const handleFilterColorScheme = useCallback(
    (value) => {
      setAppliedFilters({ ...appliedFilters, colors: value });
      setFilterColorScheme(value.value);
    },
    [appliedFilters],
  );

  const handleInputChange = (value: string) => {
    setFilterColorScheme(value);
    setAppliedFilters({
      ...appliedFilters,
      colors: {
        label: 'Custom color',
        value,
      },
    });
  };

  const selectedColorBtn = useCallback(
    (value: string) => {
      return value === filterColorScheme;
    },
    [filterColorScheme],
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
        {Object.values(appliedFilters).map((filter) => {
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
      <div>
        <Text color="gray" size="m">
          Color Scheme
        </Text>
        <TextInput
          value={filterColorScheme}
          onChange={(e) => handleInputChange(e.target.value)}
          type="text"
          placeholder="# Input hex or select"
        />
      </div>
      <div>
        <Text color="lightGray">Or</Text>
        <div className={styles.colorButtonContainer}>
          <Button
            className={styles.clearColorBtn}
            color="transparent"
            onClick={() => alert('clear all')}
          >
            <img src={cross} alt="" />
          </Button>
          {defaultColorFilterValues.map((colorFilter) => {
            const { value } = colorFilter;
            return (
              <Button
                className={cx(styles.colorBtn, { [styles.selected]: selectedColorBtn(value) })}
                onClick={() => handleFilterColorScheme(colorFilter)}
                style={{ background: value }}
              />
            );
          })}
        </div>
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
