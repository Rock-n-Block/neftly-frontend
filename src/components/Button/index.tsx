import React, { PropsWithChildren } from 'react';
import cn from 'classnames';

import Loader from '../Loader';

export interface IStyledType {
  styledType?: 'outline' | 'filled' | 'nav' | 'clear';
}
interface IButton extends IStyledType, React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  onKeyDown?: () => void;
  ariaLabel?: string;
  filledColor?: string;
  outlinedColor?: string;
  onMouseLeave?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
const Button: React.FC<IButton> = (props: PropsWithChildren<IButton>) => {
  const {
    children,
    className,
    styledType,
    filledColor,
    outlinedColor,
    disabled,
    loading,
    type = 'button',
    ...otherButtonProps
  } = props;

  const Btn = (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled || loading}
      className={cn(className, `${styledType ? `button-${styledType}` : ''}`, {
        'button-loading': loading,
      })}
      style={{ background: filledColor, border: `1px solid ${outlinedColor}` }}
      {...otherButtonProps}
    >
      {children}
      {loading ? <Loader className="loader-btn" /> : ''}
    </button>
  );
  return Btn;
};

export default Button;
