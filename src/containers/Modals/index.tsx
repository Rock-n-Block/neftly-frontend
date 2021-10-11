import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal, Checkout, ChooseSeller, PlaceBid } from 'components';
import { useMst } from '../../store';

const Modals: React.FC = () => {
  const {
    modals: { sell },
  } = useMst();
  return (
    <>
      <Modal visible={sell.checkout.getIsOpen} onClose={sell.checkout.close} title="Checkout">
        <Checkout />
      </Modal>
      <Modal
        maxWidth="565px"
        visible={sell.chooseSeller.getIsOpen}
        onClose={sell.chooseSeller.close}
        title={`Sellers (${sell.chooseSeller.sellers.length})`}
      >
        <ChooseSeller />
      </Modal>
      <Modal
        maxWidth="510px"
        visible={sell.placeBid.getIsOpen}
        onClose={sell.placeBid.close}
        title="Place a Bid"
      >
        <PlaceBid />
      </Modal>
    </>
  );
};

export default observer(Modals);
