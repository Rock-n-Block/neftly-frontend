import React, { useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { storeApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import { Button } from '..';
import { useMst } from '../../store';

import styles from './Transfer.module.scss';

interface ITransferProps {
  className?: string;
}

const Transfer: React.FC<ITransferProps> = ({ className }) => {
  const {
    modals: { transfer },
  } = useMst();
  const { walletService } = useWalletConnectorContext();
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSetAddress = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);
  const handleSetAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const handleClose = React.useCallback(() => {
    transfer.close();
  }, [transfer]);

  const transferToken = React.useCallback(() => {
    setIsLoading(true);
    storeApi
      .transferToken(transfer.tokenId.toString() || '', inputValue, amount)
      .then(({ data }: any) => {
        walletService.sendTransaction(data.initial_tx).then(() => {
          setIsLoading(false);
          transfer.success();
          transfer.close();
        });
      })
      .catch((e: any) => console.error('Bid modal sendTranscation', e))
      .finally(() => setIsLoading(false));
  }, [amount, inputValue, transfer, walletService]);

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={styles.text}>You can transfer tokens from your address to another</div>
      <div className={styles.info}>Receiver address</div>
      <div className={styles.field}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={handleSetAddress}
          type="text"
          name="address"
          placeholder="Paste address"
        />
      </div>
      {transfer.standart === 'ERC1155' && (
        <div className={styles.field}>
          <input
            className={styles.input}
            value={amount}
            onChange={handleSetAmount}
            type="number"
            name="amount"
            placeholder="Paste amount of transfered tokens"
          />
        </div>
      )}
      <div className={styles.btns}>
        <Button
          type="button"
          className={cn('button', styles.button)}
          onClick={transferToken}
          loading={isLoading}
          disabled={+amount > transfer.available}
        >
          Continue
        </Button>
        <Button
          type="button"
          className={cn('button-stroke', styles.button)}
          color="outline"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default observer(Transfer);
