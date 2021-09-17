import cn from 'classnames';
import styles from './LoaderCircle.module.scss';

interface ILoaderProps {
  className?: string;
}

const Loader: React.FC<ILoaderProps> = ({ className }) => {
  return <div className={cn(styles.loader, className)} />;
};

export default Loader;
