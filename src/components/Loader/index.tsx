import cn from 'classnames';

import styles from './Loader.module.scss';

interface ILoaderProps {
  className?: string;
  color?: string;
}

const Loader: React.FC<ILoaderProps> = ({ className, color }) => {
  return (
    <div
      className={cn(styles.loader, className, {
        [styles.loaderWhite]: color === 'white',
      })}
    />
  );
};

export default Loader;
