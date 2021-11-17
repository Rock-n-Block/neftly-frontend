import { CSSProperties, FC, PropsWithChildren, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
// import { IconNames } from 'typings';

import { Loader } from '..';

import styles from './styles.module.scss';

type Props = {
  color?: 'blue' | 'outline' | 'transparent' | 'pink' | 'dark';
  padding?: 'large' | 'small' | string;
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

/**
 * 
 * @param {'large' | 'small' | 'custom'} [tag] - padding of the element {large}
 * custom values:
 * example: [value][units] = 10px
 * * 10px
 * * 10px 10px
 * * 10px 10px 10px
 * * 10px 10px 10px 10px
 * @param {CSSProperties}  [style] - inline styles {}
 * @param {any} [size] - font size of text {normal}
 * @param {Color} [color] - color of text {blue}
 * @param {boolean} [isFullWidth] - set the with of the element 100% {false}
 * @param {(event: any) => void} [onClick] - the callback which will be called after element has been clicked {() => { }}
 * @param {'button' | 'submit'} [type] - type of button {'button'}
 * @param {boolean} [disabled] - set parameter disabled to the button {undefined}
 * @param {string} [icon] - the src of the icon {undefined}
 * @param {boolean} [loading] - set the state of loading {undefined}
 * @param {(event: any) => void} [onMouseLeave] - the callback which be called after the cursor leaves the button {undefined}
 * @param {(event: SyntheticEvent) => void} [onMouseOver] - the callback which be called after the cursor is on the button {undefined}
 * @param {string} [href] - href of the a
 * @param {Align} [align] - align of text {left}
 * @param {Weight} [weight] - font weight {normal}
 * @returns Text component
 */

const Button: FC<PropsWithChildren<Props>> = ({
  color = 'blue',
  padding = 'large',
  size = 'normal',
  isFullWidth = false,
  onClick = () => { },
  className,
  type = 'button',
  children,
  disabled,
  icon,
  style,
  href,
  loading,
  onMouseLeave,
  onMouseOver = () => { },
}) => {
  if (href)
    return (
      <Link
        to={href}
        className={cx(styles.button, styles[size], styles[color], styles[`${padding.includes('large') || padding.includes('small') ? padding : ''}`], className, {
          [styles.isFullWidth]: isFullWidth,
          [styles.disabled]: disabled,
        })}
        style={!(padding.includes('large') || padding.includes('small')) ? { ...style, padding } : style}
      >
        {icon && <img src={icon} className={styles.icon} alt="" />}
        {children}
      </Link>
    );
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(styles.button, styles[size], styles[color], styles[`${padding.includes('large') || padding.includes('small') ? padding : ''}`], className, {
        [styles.isFullWidth]: isFullWidth,
        [styles.disabled]: disabled || loading,
      })}
      onClick={onClick}
      disabled={disabled || loading}
      style={!(padding.includes('large') || padding.includes('small')) ? { ...style, padding } : style}
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
