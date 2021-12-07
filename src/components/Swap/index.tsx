import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { IconSwap } from 'assets/img';
import { Button, Text, TextInput, ToastContentWithTxHash } from 'components';
import { useUserBalance } from 'hooks';
import { observer } from 'mobx-react';
import { useWalletConnectorContext, WalletConnect } from 'services';
import { useMst } from 'store';

import styles from './Swap.module.scss';

/*interface ISwapProps {
  main: string;
  wrap: 'BEP20' | 'WETH' | 'WBNB' | 'WMATIC';
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}*/
type TWrapped = 'BEP20' | 'WETH' | 'WBNB' | 'WMATIC';

const Swap: React.FC = observer(() => {
  const walletConnector = useWalletConnectorContext();
  const {
    user,
    modals: { swap },
  } = useMst();
  const balanceMain = useUserBalance(user.address, swap.main, swap.refresh);
  const balanceWrap = useUserBalance(user.address, swap.wrap, swap.refresh);
  const [swappingCurrency, setSwappingCurrency] = useState<Array<'main' | 'wrap'>>([
    'main',
    'wrap',
  ]);
  const [isLoading, setLoading] = useState(false);
  const [payInput, setPayInput] = useState('');
  const handleConvert = useCallback(() => {
    if (swappingCurrency[0] === 'main') {
      setSwappingCurrency(['wrap', 'main']);
    } else {
      setSwappingCurrency(['main', 'wrap']);
    }
    setPayInput('');
  }, [swappingCurrency]);

  const close = useCallback(() => {
    swap.close();
  }, [swap]);

  const handleSubmitConvert = useCallback(() => {
    const weiValue =
      localStorage.lessnft_nft_chainName === WalletConnect.calcTransactionAmount(payInput, 18);
    setLoading(true);

    if (swappingCurrency[0] === 'main') {
      walletConnector.walletService
        .createTransaction('deposit', [], swap.wrap as TWrapped, '', '', '', weiValue)
        .then(async (data: any) => {
          // setRefresh(true);
          swap.setRefresh(true);
          close();
          toast.info(<ToastContentWithTxHash txHash={data.transactionHash} />);
        })
        .catch((err: any) => {
          console.error('error', err);
        })
        .finally(() => {
          // setRefresh(false);
          swap.setRefresh(false);
          setLoading(false);
        });
    }
    walletConnector.walletService
      .createTransaction('withdraw', [weiValue], swap.wrap as TWrapped)
      .then(async (data: any) => {
        // setRefresh(true);
        swap.setRefresh(true);
        close();
        toast.info(<ToastContentWithTxHash txHash={data.transactionHash} />);
      })
      .catch((err: any) => {
        console.error('error', err);
      })
      .finally(() => {
        // setRefresh(false);
        swap.setRefresh(false);
        setLoading(false);
      });
  }, [payInput, swappingCurrency, walletConnector.walletService, swap, close]);
  const handlePayInput = useCallback((value: string) => {
    setPayInput(value);
  }, []);

  const currentBalance = React.useMemo(() => {
    if (swappingCurrency[0] === 'main') {
      return user.balance?.eth;
    }
    return user.balance?.weth;
  }, [user.balance, swappingCurrency]);
  return (
    <div className={styles.swap}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Text tag="span" className={styles.label} size="m" weight="medium">
            You pay
          </Text>
          <Text tag="span" className={styles.amount} color="gray" size="m" weight="medium">
            Max amount is {swappingCurrency[0] === 'main' ? balanceMain : balanceWrap}
          </Text>
        </div>
        <TextInput
          className={styles.input}
          type="number"
          name="Pay input"
          label=""
          placeholder="Enter an amount"
          value={payInput}
          positiveOnly
          onChange={(e) => handlePayInput(e.target.value)}
          prefix={swappingCurrency[0] === 'main' ? swap.main : swap.wrap}
          prefixClassName={styles.prefix}
        />
      </div>
      <div className={styles.iconWrapper}>
        <Button color="transparent" onClick={handleConvert}>
          <IconSwap />
        </Button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Text className={styles.label} size="m" weight="medium">
            You receive
          </Text>
        </div>
        <TextInput
          className={styles.input}
          type="number"
          name="Pay input"
          label=""
          placeholder="Amount you will receive"
          value={payInput}
          positiveOnly
          onChange={(e) => handlePayInput(e.target.value)}
          prefix={swappingCurrency[1] === 'main' ? swap.main : swap.wrap}
          prefixClassName={styles.prefix}
        />
      </div>
      <div className={styles.btns}>
        <Button
          className={styles.button}
          onClick={handleSubmitConvert}
          loading={isLoading}
          disabled={+payInput > +currentBalance || +payInput <= 0}
          color="blue"
        >
          Convert
        </Button>
      </div>
    </div>
  );
});

export default Swap;
