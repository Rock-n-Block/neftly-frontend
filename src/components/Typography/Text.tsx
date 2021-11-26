import { createElement, CSSProperties, FC, PropsWithChildren, RefObject } from 'react';
import cx from 'classnames';
import {
  TextAlign as Align,
  TextColor as Color,
  TextSize as Size,
  TextWeight as Weight,
} from 'typings';

import styles from './styles.module.scss';

type Tag = 'p' | 'span';

type Props = {
  tag?: Tag;
  className?: string;
  style?: CSSProperties;
  size?: Size;
  color?: Color;
  align?: Align;
  weight?: Weight;
  elRef?: RefObject<any>;
  description?: string;
};

/**
 * 
 * @param {'p' | 'span'} [tag] - type of element {p}
 * @param {CSSProperties}  [style] - inline styles {}
 * @param {Size} [size] - font size of text {s}
 * * xxxs - 10px
 * * xxs - 11px
 * * xs - 12px
 * * s - 14px
 * * m - 16px
 * * l - 18px
 * * xl - 20px
 * * xxl - 24px
 * * xxxl - 32px
 * * xxxxl - 48px
 * * inherit - inherit
 * @param {Color} [color] - color of text {black}
 * @param {Align} [align] - align of text {left}
 * @param {Weight} [weight] - font weight {normal}
 * @returns Text component
 */
const Text: FC<PropsWithChildren<Props>> = ({
  tag = 'p',
  children,
  className,
  style = {},
  size = 's',
  color = 'black',
  align = 'left',
  weight = 'normal',
  elRef,
  description,
}) =>
  createElement(
    tag,
    {
      style,
      ref: elRef,
      description,
      className: cx(
        styles.text,
        styles[`size_${size}`],
        styles[`color_${color}`],
        styles[`align_${align}`],
        styles[`weight_${weight}`],
        className,
      ),
    },
    children,
  );

export default Text;
