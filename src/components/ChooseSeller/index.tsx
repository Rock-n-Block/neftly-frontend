import React from 'react';
import { observer } from 'mobx-react-lite';
import { Scrollbar } from 'react-scrollbars-custom';

import { useMst } from '../../store';
import { Button } from 'components';

import styles from './ChooseSeller.module.scss';

const ChooseSeller: React.FC = () => {
  const {
    modals: { sell },
  } = useMst();

  const handleChooseSeller = React.useCallback(
    (sellerId: string | number) => {
      sell.chooseSeller.close();
      sell.checkout.open(sellerId);
    },
    [sell],
  );

  return (
    <div className={styles.container}>
      <Scrollbar
        className="navbar__scroll"
        style={{
          width: '100%',
          height:
            sell.chooseSeller.sellers.length > 8
              ? '280px'
              : `${sell.chooseSeller.sellers.length * 56}px`,
        }}
      >
        {sell.chooseSeller.sellers.map((seller) => (
          <div className={styles.item} key={seller.id}>
            <div className={styles.itemWrapper}>
              <div className={styles.itemImg}>
                <img src={seller.avatar} alt="" />
              </div>
              <div className="">
                <div className={styles.itemName}>{seller.name}</div>
                <div className={styles.itemQuantity}>{`${seller.quantity} token`}</div>
              </div>
            </div>
            <div className={styles.itemWrapper}>
              <div className={styles.currency}>{`${
                seller.price
              } ${sell.nft.currency.toUpperCase()}`}</div>
              <Button onClick={() => handleChooseSeller(seller.id)} className={styles.btn}>
                Buy
              </Button>
            </div>
          </div>
        ))}
      </Scrollbar>
    </div>
  );
};

export default observer(ChooseSeller);
