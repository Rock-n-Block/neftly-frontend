import { CSSProperties, FC, PropsWithChildren, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
// import { IconNames } from 'typings';

import { Loader } from '..';

import styles from './styles.module.scss';

type Props = {
  color?: 'blue' | 'outline' | 'transparent' | 'pink' | 'dark';
  size?: any;
  isFullWidth?: boolean;
  className?: string;
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  // icon?: IconNames;
  icon?: string;
  loading?: boolean;
  onMouseLeave?: (event: any) => void;
  onMouseOver?: (event: SyntheticEvent) => void;
  style?: CSSProperties;
  href?: string;
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
  style,
  href,
  loading,
  onMouseLeave,
  onMouseOver = () => {},
}) => {
  if (href)
    return (
      <Link
        to={href}
        className={cx(styles.button, styles[size], styles[color], className, {
          [styles.isFullWidth]: isFullWidth,
          [styles.disabled]: disabled,
        })}
        style={style}
      >
        {icon && <img src={icon} className={styles.icon} alt="" />}
        {children}
      </Link>
    );
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(styles.button, styles[size], styles[color], className, {
        [styles.isFullWidth]: isFullWidth,
        [styles.disabled]: disabled || loading,
      })}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseOver}
    >
      {icon && <img src={icon} className={styles.icon} alt="" />}
      {children}
      {loading ? <Loader className={styles.loader} /> : ''}
    </button>
  );
};

export default Button;
