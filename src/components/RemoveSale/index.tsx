import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../services/api';
import { useMst } from '../../store';
import { Button } from '..';

import styles from './RemoveSale.module.scss';

interface IRemoveSaleProps {
  className?: string;
}

const RemoveSale: React.FC<IRemoveSaleProps> = ({ className }) => {
  const {
    modals: { remove },
  } = useMst();

  const removeFromSale = React.useCallback(async () => {
    try {
      await storeApi.removeFromSale(remove.tokenId, null, null);
      remove.success();
    } catch (error) {
      console.log(error, 'remove from sale');
    }
  }, [remove]);

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={styles.text}>
        Do you really want to remove your item from sale? You can put it on sale anytime
      </div>
      <div className={styles.btns}>
        <Button
          type="button"
          className={cn('button', styles.button)}
          onClick={removeFromSale}
          isFullWidth
        >
          Remove now
        </Button>
        <Button
          type="button"
          className={cn('button-stroke', styles.button)}
          isFullWidth
          color="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default observer(RemoveSale);
