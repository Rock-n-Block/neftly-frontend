import { Dispatch, SetStateAction } from 'react';
import nextId from 'react-id-generator';
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
        {filters.map((x) => (
          <Checkbox
            className={styles.checkbox}
            content={x}
            value={selectedFilters.includes(x)}
            onChange={() => handleChange(x)}
            key={nextId()}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
