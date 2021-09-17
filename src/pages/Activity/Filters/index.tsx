import { Dispatch, SetStateAction } from 'react';
import nextId from 'react-id-generator';
import cn from 'classnames';

import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';

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
      <div className={styles.info}>Filters</div>
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
      <div className={styles.btns}>
        <Button
          className={cn('button-stroke button-small', styles.button)}
          onClick={() => selectAll()}
        >
          Select all
        </Button>
        <Button
          className={cn('button-stroke button-small', styles.button)}
          onClick={() => unselectAll()}
        >
          Unselect all
        </Button>
      </div>
    </div>
  );
};

export default Filters;
