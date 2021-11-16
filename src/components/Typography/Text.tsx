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
  elRef?: RefObject<any>
};

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
}) =>
  createElement(
    tag,
    {
      style,
      ref: elRef,
      className: cx(
        styles.text,
        styles[size],
        styles[color],
        styles[align],
        styles[`${weight}Weight`],
        className,
      ),
    },
    children,
  );

export default Text;
