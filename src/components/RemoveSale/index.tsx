import React from 'react';
import cn from 'classnames';
import styles from './RemoveSale.module.scss';

interface IRemoveSaleProps {
  className?: string;
  removeFromSale: () => void;
}

const RemoveSale: React.FC<IRemoveSaleProps> = ({ className, removeFromSale }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>Remove from sale</div>
      <div className={styles.text}>
        Do you really want to remove your item from sale? You can put it on sale anytime
      </div>
      <div className={styles.btns}>
        <button type="button" className={cn('button', styles.button)} onClick={removeFromSale}>
          Remove now
        </button>
        <button type="button" className={cn('button-stroke', styles.button)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

RemoveSale.defaultProps = {
  className: '',
};

export default RemoveSale;
