import cn from 'classnames';

import styles from './LoaderCircle.module.scss';
import { FC } from 'react';

interface ILoaderProps {
  className?: string;
}

const Loader: FC<ILoaderProps> = ({ className }) => {
  return <div className={cn(styles.loader, className)} />;
};

export default Loader;
