import { FC } from 'react';
import { cross } from 'assets/img';
import cx from 'classnames';
import { Button, H3, RangePicker, Select, Text } from 'components';
import { OptionType } from 'typings';

// import FilterTag from './FilterTag';
import styles from './styles.module.scss';


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
  filterSelectCurrencyOptions: any;
  maxPrice: number;
  maxPriceFilter: number;
  handleMaxPriceFilter: (maxPrice: number) => void;
  currencyFilter: OptionType;
  handleCurrencyFilter: (value: any) => void;
  verifiedFilter: OptionType;
  handleVerifiedFilter: (value: any) => void;
};

const AdvancedFilter: FC<Props> = ({
  isMobile,
  className,
  filterSelectCurrencyOptions,
  maxPrice,
  maxPriceFilter,
  handleMaxPriceFilter,
  currencyFilter,
  handleCurrencyFilter,
  verifiedFilter,
  handleVerifiedFilter,
}) => {
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
      {/* <div className={styles.advancedFilterFlex}>
        <Text>Applied Filters</Text>
        <Button color="transparent">
          <Text color="gray">Clear all</Text>
        </Button>
      </div> */}
      <div className={styles.tagContainer}>
        {/* {Object.values(appliedFilters).map((filter: IAppliedFilter) => {
          return (
            <FilterTag
              className={styles.filterTag}
              label={typeof filter === 'string' ? filter : filter.label}
            />
          );
        })} */}
      </div>
      <div>
        <Text color="gray">Price Range</Text>
        <RangePicker
          className={styles.rangeFilter}
          onChange={handleMaxPriceFilter}
          value={maxPriceFilter}
          min={0}
          max={maxPrice}
          step={0.01}
          isDebounce
        />
      </div>
      <div>
        <Text color="gray" size="m">
          Currency
        </Text>
        <Select
          onChange={handleCurrencyFilter}
          value={currencyFilter}
          options={filterSelectCurrencyOptions}
        />
      </div>
      {/* <div>
        <Text color="gray" size="m">
          Likes
        </Text>
        <Select
          onChange={handleLikesFilter}
          value={likesFilter}
          options={filterSelectLikesOptions}
        />
      </div> */}
      <div>
        <Text color="gray" size="m">
          Artists
        </Text>
        <Select
          onChange={handleVerifiedFilter}
          value={verifiedFilter}
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
