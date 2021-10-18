import cn from 'classnames';

import styles from './Loader.module.scss';
import { FC } from 'react';

interface ILoaderProps {
  className?: string;
  color?: string;
}

const Loader: FC<ILoaderProps> = ({ className, color }) => {
  return (
    <div
      className={cn(styles.loader, className, {
        [styles.loaderWhite]: color === 'white',
      })}
    />
  );
};

export default Loader;
