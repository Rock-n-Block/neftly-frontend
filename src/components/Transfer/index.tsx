import React, { useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { Button, Text, TextInput } from 'components';
import { observer } from 'mobx-react-lite';
import { storeApi, useWalletConnectorContext } from 'services';
import { useMst } from 'store';

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
        walletService
          .sendTransaction(data.initial_tx)
          .then(() => {
            transfer.success();
            transfer.close();
            toast.success('Token Transfered');
          })
          .catch((e: any) => {
            toast.error({
              message: 'Error',
              description: 'Token Transfer failed',
            });
            console.error('Token Transfer failed', e);
          })
          .finally(() => setIsLoading(false));
      })
      .catch((e: any) => {
        toast.error({
          message: 'Error',
          description: 'Token Transfer failed',
        });
        console.error('Token Transfer failed', e);
        setIsLoading(false);
      });
  }, [amount, inputValue, transfer, walletService]);

  return (
    <div className={cn(className, styles.transfer)}>
      <Text className={styles.text} weight="medium" color="lightGray" size="m">
        You can transfer tokens from your address to another
      </Text>
      <Text className={styles.info} weight="medium" color="lightGray" size="xl">
        Receiver address
      </Text>
      <div className={styles.field}>
        <TextInput
          value={inputValue}
          onChange={handleSetAddress}
          type="text"
          name="address"
          placeholder="Paste address"
        />
      </div>
      {transfer.standart === 'ERC1155' && (
        <div className={styles.field}>
          <TextInput
            className={styles.input}
            value={amount}
            onChange={handleSetAmount}
            type="number"
            name="amount"
            placeholder="Paste amount of transfered tokens"
            positiveOnly
            integer
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
          color="blue"
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
