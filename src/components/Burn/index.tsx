import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { storeApi } from '../../services/api';
import { useWalletConnectorContext } from '../../services/walletConnect';
import { Button } from '..';

import styles from './Burn.module.scss';

interface IBurnProps {
  className?: string;
  itemId?: string;
  standart?: string;
}

const Burn: React.FC<IBurnProps> = ({ className, itemId, standart }) => {
  const walletConnector = useWalletConnectorContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const burnToken = useCallback(() => {
    storeApi
      .burnToken(itemId || '', amount)
      .then(({ data }: any) => {
        return walletConnector.walletService.sendTransaction(data.initial_tx);
      })
      .catch((e: any) => console.error('Bid modal sendTranscation', e))
      .finally(() => setIsLoading(false));
  }, [itemId, amount, walletConnector.walletService]);

  useEffect(() => {
    if (isLoading) burnToken();
  }, [isLoading, burnToken]);
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={styles.text}>
        Are you sure to burn this token? This action cannot be undone. Token will be transfered to
        zero address
      </div>
      {standart === 'ERC1155' && (
        <div className={styles.field}>
          <input
            className={styles.input}
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            type="number"
            name="amount"
            placeholder="Paste amount of burned tokens"
          />
        </div>
      )}
      <div className={styles.btns}>
        <Button
          type="button"
          className={cn('button-pink', styles.button)}
          onClick={() => setIsLoading(true)}
          isFullWidth
          color="pink"
        >
          Continue
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

export default Burn;
