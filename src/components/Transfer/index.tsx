import { useState } from 'react';
import cn from 'classnames';

import { storeApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import Button from '../Button';

import styles from './Transfer.module.scss';

interface ITransferProps {
  className?: string;
  itemId?: string;
  standart?: string;
  onClose: () => void;
}

const Transfer: React.FC<ITransferProps> = ({ className, itemId, standart, onClose }) => {
  const walletConnector = useWalletConnectorContext();
  const [inputValue, setInputValue] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const transferToken = () => {
    setIsLoading(true);
    storeApi
      .transferToken(itemId || '', inputValue, amount)
      .then(({ data }: any) => {
        walletConnector.metamaskService.sendTransaction(data.initial_tx).then(() => {
          setIsLoading(false);
          onClose();
        });
      })
      .catch((e: any) => console.error('Bid modal sendTranscation', e))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>Transfer token</div>
      <div className={styles.text}>You can transfer tokens from your address to another</div>
      <div className={styles.info}>Receiver address</div>
      <div className={styles.field}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          type="text"
          name="address"
          placeholder="Paste address"
        />
      </div>
      {standart === 'ERC1155' && (
        <div className={styles.field}>
          <input
            className={styles.input}
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
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
        >
          Continue
        </Button>
        <Button type="button" className={cn('button-stroke', styles.button)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Transfer;
