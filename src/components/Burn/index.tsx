import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { storeApi } from 'services/api';
import { useWalletConnectorContext } from 'services/walletConnect';
import { Button } from 'components';
import { useMst } from 'store';

import styles from './Burn.module.scss';
import { useHistory } from 'react-router';

interface IBurnProps {
  className?: string;
}

const Burn: React.FC<IBurnProps> = ({ className }) => {
  const {
    modals: { burn },
  } = useMst();
  const history = useHistory();
  const walletConnector = useWalletConnectorContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const burnToken = useCallback(() => {
    storeApi
      .burnToken(burn.tokenId.toString() || '', amount)
      .then(({ data }: any) => {
        walletConnector.walletService.sendTransaction(data.initial_tx).then(() => {
          burn.success();
          burn.close();
          toast.success('Token Burned');
          history.push('/');
        });
      })
      .catch(() => {
        toast.error('Bid modal sendTranscation');
      })
      .finally(() => setIsLoading(false));
  }, [burn, amount, walletConnector.walletService, history]);

  useEffect(() => {
    if (isLoading) burnToken();
  }, [isLoading, burnToken]);
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={styles.text}>
        Are you sure to burn this token? This action cannot be undone. Token will be transfered to
        zero address
      </div>
      {burn.standart === 'ERC1155' && (
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
          disabled={+amount > burn.amount || (burn.standart === 'ERC1155' && !amount)}
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

export default observer(Burn);
