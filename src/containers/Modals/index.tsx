import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal, Checkout, ChooseSeller, PlaceBid, Burn } from 'components';
import { useMst } from '../../store';

const Modals: React.FC = () => {
  const {
    modals: { sell, burn },
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
      <Modal maxWidth="510px" visible={burn.getIsOpen} onClose={burn.close} title="Burn token">
        <Burn />
      </Modal>
    </>
  );
};

export default observer(Modals);
