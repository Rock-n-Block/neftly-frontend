import { FC } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type Props = {
  leftLabel: string;
  rightLabel: string;
  checked: boolean;
  className?: string;
  classNameActive?: string;
  classNameLeft?: string;
  classNameRight?: string;
  onChange?: (value: boolean) => void;
};

const Switcher: FC<Props> = ({
  leftLabel,
  rightLabel,
  checked,
  className,
  classNameActive,
  classNameLeft,
  classNameRight,
  onChange = () => {},
}) => (
  <div className={cx(styles.label, className)}>
    <button
      type="button"
      className={cx(styles.btn, !checked ? classNameActive : '', classNameLeft, {
        [styles.active]: !checked,
      })}
      onClick={() => onChange(false)}
    >
      {leftLabel}
    </button>

    <button
      type="button"
      className={cx(styles.btn, checked ? classNameActive : '', classNameRight, {
        [styles.active]: checked,
      })}
      onClick={() => onChange(true)}
    >
      {rightLabel}
    </button>
  </div>
);

export default Switcher;
