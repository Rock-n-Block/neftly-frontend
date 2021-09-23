import { FC, PropsWithChildren } from 'react';
import cx from 'classnames';
import { IconNames } from 'typings';

import { Icon } from '..';

import styles from './styles.module.scss';

type Props = {
  color?: 'blue' | 'outline' | 'transparent';
  size?: any;
  isFullWidth?: boolean;
  className?: string;
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: IconNames;
  loading?: boolean;
  styledType?: string;
  onMouseLeave?: any;
};

const Button: FC<PropsWithChildren<Props>> = ({
  color = 'blue',
  size = 'normal',
  isFullWidth = false,
  onClick = () => {},
  className,
  type = 'button',
  children,
  disabled,
  icon,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={cx(styles.button, styles[size], styles[color], className, {
      [styles.isFullWidth]: isFullWidth,
      [styles.disabled]: disabled,
    })}
    onClick={onClick}
    disabled={disabled as boolean}
  >
    {icon && <Icon className={styles.icon} name={icon} />}
    {children}
  </button>
);

export default Button;
