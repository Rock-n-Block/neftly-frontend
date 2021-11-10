/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';

import styles from './DropdownWithImage.module.scss';

interface IDropdownWithImageProps {
  className?: string;
  value: string;
  setValue: (str: string) => void;
  options: Array<any>;
  imageSrc?: string;
  customClasses?: {
    user?: string;
    head?: string;
    avatar?: string;
    selection?: string;
    arrow?: string;
    body?: string;
    option?: string;
  };
  name?: string;
}
const DropdownWithImage: React.FC<IDropdownWithImageProps> = ({
  // className,
  value,
  setValue,
  options,
  name,
  // imageSrc,
  // customClasses = {},
}) => {
  const [visible, setVisible] = useState(false);
  const handleClick = (str: string) => {
    setValue(str);
    setVisible(false);
  };
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.dropdownCurrency, { [styles.activeDropdown]: visible })} id={name}>
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={styles.headCurrency}
          onClick={() => setVisible(!visible)}
        >
          <div className={styles.selection}>{value}</div>
        </div>
        <div className={styles.bodyCurrency}>
          {options.map((x, index) => (
            <div
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
              className={cn(styles.optionCurrency, {
                [styles.selectioned]: x.symbol.toUpperCase() === value,
              })}
              onClick={() => handleClick(x.symbol)}
              key={index}
            >
              <img alt="" className={styles.image} src={x.image} />
              <span className={styles.textCurrency}>{x.symbol}</span>
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownWithImage;
