import { cloneElement, CSSProperties, FC, PropsWithChildren, ReactElement } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import Tooltip from 'rc-tooltip';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactElement;
};
/**
 * Gets ellipsisText with tooltip on hover, accepts tags Text or H
 * */
const EllipsisText: FC<PropsWithChildren<Props>> = ({ children, className, style = {} }) => {
  const text = cloneElement(children, { className: cn(className, styles.ellipsis), style });
  return (
    <Tooltip overlay={children} overlayClassName={styles.tooltip}>
      {text}
    </Tooltip>
  );
};

export default EllipsisText;
