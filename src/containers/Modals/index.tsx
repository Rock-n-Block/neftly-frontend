import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal, Checkout, ChooseSeller } from 'components';
import { useMst } from '../../store';

const Modals: React.FC = () => {
  const { modals } = useMst();
  return (
    <>
      <Modal
        visible={modals.sell.checkout.isOpen}
        onClose={modals.sell.checkout.close}
        title="Checkout"
      >
        <Checkout />
      </Modal>
      <Modal
        maxWidth="565px"
        visible={modals.sell.chooseSeller.getIsOpen}
        onClose={modals.sell.chooseSeller.close}
        title={`Sellers (${modals.sell.chooseSeller.sellers.length})`}
      >
        <ChooseSeller />
      </Modal>
    </>
  );
};

export default observer(Modals);
