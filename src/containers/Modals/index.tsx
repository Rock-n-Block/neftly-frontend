import React from 'react';
import { observer } from 'mobx-react-lite';

import { Modal, Checkout } from 'components';
import { useMst } from '../../store';

const Modals: React.FC = () => {
  const { modals } = useMst();
  return (
    <>
      <Modal visible={modals.checkout.isOpen} onClose={modals.checkout.close} title="Checkout">
        <Checkout />
      </Modal>
    </>
  );
};

export default observer(Modals);
