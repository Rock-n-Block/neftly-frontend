import { useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';

import {arrowDown} from 'assets/img/icons';


import styles from './Dropdown.module.scss';

interface IDropdownProps {
  className?: string;
  value: string;
  setValue: (str: string) => void;
  options: Array<any>;
  isWithImage?: boolean;
  isWritable?: boolean;
  name?: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
  className,
  value,
  setValue,
  options,
  isWithImage,
  isWritable,
  name,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (str: string) => {
    setValue(str);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.dropdown, className, { [styles.active]: visible })} id={name}>
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={styles.head}
          onClick={() => setVisible(!visible)}
        >
          {isWritable ? (
            <input value={value} className={styles.input} />
          ) : (
            <div className={styles.selection}>{value}</div>
          )}
          <img alt="open dropdown" src={arrowDown} className={styles.arrow}/>
        </div>
        {!isWithImage ? (
          <div className={styles.body}>
            {typeof options[0] === 'string'
              ? options.map((x) => (
                  <div
                    onKeyDown={() => {}}
                    tabIndex={0}
                    role="button"
                    className={cn(
                      styles.option,
                      {
                        [styles.selectioned]: x === value,
                      },
                      x === value ? 'selected' : '',
                    )}
                    onClick={() => handleClick(x)}
                    key={nextId()}
                  >
                    {x}
                  </div>
                ))
              : options.map((x) => (
                  <div
                    onKeyDown={() => {}}
                    tabIndex={0}
                    role="button"
                    className={cn(
                      styles.option,
                      {
                        [styles.selectioned]: x.text === value,
                      },
                      x.text === value ? 'text-gradient' : '',
                    )}
                    onClick={() => handleClick(x.text)}
                    key={nextId()}
                  >
                    {x.icon}
                    <span className={styles.text}>{x.text}</span>
                  </div>
                ))}
          </div>
        ) : (
          <div className={styles.body}>
            {options.map((x: any) => (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn(
                  styles.option,
                  {
                    [styles.selectioned]: x.symbol === value,
                  },
                  x.symbol === value ? 'text-gradient' : '',
                )}
                onClick={() => handleClick(x.symbol)}
                key={nextId()}
              >
                <img alt="" className={styles.image} src={x.image} />
                <span className={styles.text}>{x.symbol}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
