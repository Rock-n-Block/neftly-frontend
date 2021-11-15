import {FC, useState} from 'react';
import {OptionType} from 'typings';
import cn from 'classnames';
import styles from './styles.module.scss';
import OutsideClickHandler from 'react-outside-click-handler';
import {iconArrowDownBlue} from 'assets/img';

interface IProps {
  options: OptionType[];
  value: OptionType;
  setValue: (value: OptionType) => void;
  className?: string;
  trianglePosition?: null | 'left' | 'right' | 'center';
}

const TitleDropdown: FC<IProps> = ({ options, value, setValue, className, trianglePosition = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOptionClick = (option: OptionType) => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <div className={cn(styles.titleDropdown, className)}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => {
          }}
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={styles.selected}
        >
          last{' '}
          {value.label}
          <img
            src={iconArrowDownBlue}
            alt=""
            className={cn(styles.selectedImg, {[styles.selectedImgOpen]: isOpen})}
          />
        </div>
        {trianglePosition ? <div className={`${styles.triangle} ${styles[trianglePosition]}`} /> : null}
        <ul className={cn(styles.body, { [styles.activeDropdown]: isOpen, [styles[trianglePosition || 'right']]: trianglePosition })}>
          {options.map((option) => (
            <li>
              <div
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                }}
                onClick={() => handleOptionClick(option)}
                className={styles.option}
              >
                {option.label}
              </div>
            </li>
          ))}
        </ul>
      </OutsideClickHandler>
    </div>
  );
};
export default TitleDropdown;
