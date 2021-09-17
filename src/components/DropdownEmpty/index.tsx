import React, { useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';

import Icon from '../Icon';

import styles from './DropdownEmpty.module.scss';

interface IDropdownEmptyProps {
  className?: string;
  value: string;
  setValue: (str: string) => void;
  options: Array<string>;
}

const DropdownEmpty: React.FC<IDropdownEmptyProps> = ({ className, value, setValue, options }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (str: string) => {
    setValue(str);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.dropdown, className, { [styles.active]: visible })}>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
          className={styles.head}
          onClick={() => setVisible(!visible)}
        >
          <div className={styles.selection}>{value}</div>
          <Icon name="arrow-bottom" size="15" />
        </div>
        <div className={styles.body}>
          {options.map((x) => (
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
              className={cn(styles.option, {
                [styles.selectioned]: x === value,
              })}
              onClick={() => handleClick(x)}
              key={nextId()}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownEmpty;
