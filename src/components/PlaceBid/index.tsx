import React from 'react';
import { observer } from 'mobx-react-lite';

import { useMst } from '../../store';

import styles from './PlaceBid.module.scss';

const PlaceBid: React.FC = () => {
  const {
    modals: { sell },
  } = useMst();
  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{`You must bid at least ${
        sell.nft.minimalBid
      } ${sell.nft.currency.toUpperCase()}`}</div>
    </div>
  );
};

export default observer(PlaceBid);
