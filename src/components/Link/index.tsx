/* eslint-disable prettier/prettier */
/* eslint-disable react/no-children-prop */
import React, { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import { Text } from '..';

import styles from './styles.module.scss';

type Props = {
  link: string;
  name?: string;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  color?: 'white' | 'lightGray';
};

const CustomLink: FC<PropsWithChildren<Props>> = ({
  link,
  name,
  className,
  external = false,
  onClick = () => {},
  children,
  color,
}) => {
  const Component = external ? 'a' : NavLink;
  const anchor = external ? 'href' : 'to';
  const additionalProps = external ? { target: '_blank' } : {};
  const activeClassName = external ? 'activeclassname' : 'activeClassName';

  const Inner = (
    <Text size="m" tag="span" color={color} className={styles.text}>
      {name}
    </Text>
  );
  return React.createElement(
    Component,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    {
      [anchor]: link,
      className: cx(styles.link, className),
      [activeClassName]: styles.active,
      exact: !external || undefined,
      onClick,
      ...additionalProps,
      children,
    },
    Inner,
  );
};

export default CustomLink;
