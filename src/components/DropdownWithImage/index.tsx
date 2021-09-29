import { useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';

// import Icon from '../Icon';
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
          {options.map((x: any) => (
            <div
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
              className={cn(styles.optionCurrency, {
                [styles.selectioned]: x.symbol.toUpperCase() === value,
              })}
              onClick={() => handleClick(x.symbol)}
              key={nextId()}
            >
              <img alt="" className={styles.image} src={x.image} />
              <span className={styles.textCurrency}>{x.symbol}</span>
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
    // <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
    //   <div className={cn(className, styles.user, { [styles.active]: visible }, customClasses.user)}>
    //     <div
    //       tabIndex={0}
    //       onKeyDown={() => {}}
    //       role="button"
    //       className={cn(styles.head, customClasses.head)}
    //       onClick={() => setVisible(!visible)}
    //     >
    //       {imageSrc && (
    //         <div className={cn(styles.avatar, customClasses.avatar)}>
    //           <img src={imageSrc} alt="Avatar" />
    //         </div>
    //       )}
    //       <div className={cn(styles.selection, customClasses.selection)}>{value}</div>
    //       <div className={cn(styles.arrow, customClasses.arrow)}>
    //         <Icon name="arrow-bottom" size="13" />
    //       </div>
    //     </div>
    //     <div className={cn(styles.body, customClasses.body)}>
    //       {options.map((x) => (
    //         <div
    //           onKeyDown={() => {}}
    //           tabIndex={0}
    //           role="button"
    //           className={cn(
    //             styles.option,
    //             {
    //               [styles.selected]: x === value,
    //             },
    //             customClasses.option,
    //           )}
    //           onClick={() => handleClick(x)}
    //           key={JSON.stringify(x)}
    //         >
    //           {x}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </OutsideClickHandler>
  );
};

export default DropdownWithImage;
