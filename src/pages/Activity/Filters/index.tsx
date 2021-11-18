import { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import { H4, Checkbox, Button } from 'components';

import styles from './Filters.module.scss';

interface IFiltersProps {
  className?: string;
  filters: Array<string>;
  selectedFilters: Array<string>;
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  selectAll: () => void;
  unselectAll: () => void;
}

const Filters: React.FC<IFiltersProps> = ({
  className,
  filters,
  selectedFilters,
  setSelectedFilters,
  selectAll,
  unselectAll,
}) => {
  const handleChange = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className={cn(styles.filters, className)}>
      <H4 className={styles.info}>Filter</H4>
      <div className={styles.buttons}>
        <Button
          color="transparent"
          onClick={() => selectAll()}
          type="button"
          padding="0"
          className={styles.button}
        >
          Select all
        </Button>
        <Button
          color="transparent"
          onClick={() => unselectAll()}
          type="button"
          className={styles.button}
        >
          Unselect all
        </Button>
      </div>
      <div className={styles.group}>
        {filters.map((filter) => (
          <Checkbox
            className={styles.checkbox}
            content={filter}
            value={selectedFilters.includes(filter)}
            onChange={() => handleChange(filter)}
            key={filter}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
