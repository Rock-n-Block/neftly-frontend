import { FC, useEffect, useState } from 'react';
import { cross } from 'assets/img';
import cx from 'classnames';
import { Button, H3, RangePicker, Select, Text } from 'components';
import { IAppliedFilter, OptionType } from 'typings';

import styles from './styles.module.scss';
import FilterTag from './FilterTag';
import { TDefaultValues } from 'hooks/useFilters';

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
    value: 'All',
    label: 'All', 
  }
];

type Props = {
  className?: string;
  isMobile?: boolean;
  filterSelectCurrencyOptions: any;
  maxPrice: number;
  maxPriceFilter: OptionType;
  handleMaxPriceFilter: (maxPrice: any) => void;
  currencyFilter: OptionType;
  handleCurrencyFilter: (value: any) => void;
  verifiedFilter: OptionType;
  handleVerifiedFilter: (value: any) => void;
  defaultValues: TDefaultValues;
};

//type TFilters = 'currency' | 'amount' | 'artist'

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
  defaultValues
}) => {

  const [appliedFilters, setAppliedFilters] = useState<IAppliedFilter[]>([maxPriceFilter, currencyFilter, verifiedFilter])

  useEffect(() => {
    setAppliedFilters([maxPriceFilter, currencyFilter, verifiedFilter])
  }, [maxPriceFilter, currencyFilter, verifiedFilter])

  return (
    <div className={cx(styles.advancedFilter, { [styles.mobile]: isMobile }, className)}>
      {isMobile && (
        <div className={styles.advancedFilterFlex}>
          <H3 color='lightGray'>Advanced Filter</H3>
          <Button color="outline" className={styles.advancedFilterCloseBtn}>
            <img src={cross} alt="" />
          </Button>
        </div>
      )}
      <div className={styles.advancedFilterApplied}>
        <Text color='lightGray'>Applied Filters</Text>
        <Button padding='0' className={styles.clearBtn} color="transparent">
          <Text color="inherit">Clear all</Text>
        </Button>
      </div>
      <div className={styles.tagContainer}>
        {appliedFilters.filter((filter: IAppliedFilter) => !Object.values(defaultValues).includes(filter.value)).map((filter: IAppliedFilter) =>
          <FilterTag
            key={filter.value}
            className={styles.filterTag}
            label={filter.label}
          />
        )
        }
      </div>
      <div>
        <Text color="gray" weight="medium" className={styles.label}>
          Price Range
        </Text>
        {console.log(maxPriceFilter.value)}
        <RangePicker
          className={styles.rangeFilter}
          onChange={handleMaxPriceFilter}
          value={+maxPriceFilter.value}
          min={0}
          max={maxPrice}
          step={maxPrice/100}
          isDebounce
        />
      </div>
      <div>
        <Text size="m" color="gray" weight="medium" className={styles.label}>
          Currency
        </Text>
        <Select
          onChange={handleCurrencyFilter}
          value={currencyFilter}
          options={filterSelectCurrencyOptions}
        />
      </div>
      <div>
        <Text size="m" color="gray" weight="medium" className={styles.label}>
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
