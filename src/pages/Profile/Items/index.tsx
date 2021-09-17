import nextId from 'react-id-generator';
import cn from 'classnames';

import Card from '../../../components/Card';
import Loader from '../../../components/Loader';

import styles from './Items.module.scss';

// TODO: fix any
interface IItemsProps {
  className?: string;
  items: any;
}

const Items: React.FC<IItemsProps> = ({ className, items }) => {
  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {items.map((x: any) => (
          <Card className={styles.card} item={x} key={nextId()} />
        ))}
      </div>
      <Loader className={styles.loader} />
    </div>
  );
};

export default Items;
