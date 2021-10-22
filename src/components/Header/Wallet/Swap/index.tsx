import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { iconSwap } from 'assets/img';
import cn from 'classnames';
import { Button, H4, Text, TextInput, ToastContentWithTxHash } from 'components';
import { useUserBalance } from 'hooks';
import { observer } from 'mobx-react';
import { useWalletConnectorContext, WalletConnect } from 'services';
import { useMst } from 'store';

import styles from './Swap.module.scss';

interface ISwapProps {
  className?: string;
  close: () => void;
  main: string;
  wrap: 'BEP20' | 'WETH' | 'WBNB' | 'WMATIC' | 'WTRX';
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

const Swap: React.FC<ISwapProps> = observer(
  ({ className, close, main, wrap, refresh, setRefresh }) => {
    const walletConnector = useWalletConnectorContext();
    const { user } = useMst();
    const balanceMain = useUserBalance(user.address, main, refresh);
    const balanceWrap = useUserBalance(user.address, wrap, refresh);
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
    const handleSubmitConvert = useCallback(() => {
      const weiValue = WalletConnect.calcTransactionAmount(payInput, 18);
      setLoading(true);

      if (swappingCurrency[0] === 'main') {
        walletConnector.walletService
          .createTransaction('deposit', [], wrap, '', '', '', weiValue)
          .then(async (data: any) => {
            setRefresh(true);
            close();
            toast.info(<ToastContentWithTxHash txHash={data.transactionHash} />);
          })
          .catch((err: any) => {
            console.error('error', err);
          })
          .finally(() => {
            setRefresh(false);
            setLoading(false);
          });
      } else {
        walletConnector.walletService
          .createTransaction('withdraw', [weiValue], wrap)
          .then(async (data: any) => {
            setRefresh(true);
            close();
            toast.info(<ToastContentWithTxHash txHash={data.transactionHash} />);
          })
          .catch((err: any) => {
            console.error('error', err);
          })
          .finally(() => {
            setRefresh(false);
            setLoading(false);
          });
      }
    }, [close, payInput, swappingCurrency, walletConnector.walletService, wrap, setRefresh]);
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
      <div className={cn(className, styles.swap)}>
        <H4 className={styles.title}>Convert</H4>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Text tag="span" className={styles.label} size="m" color="lightGray" weight="medium">
              You pay
            </Text>
            <Text tag="span" className={styles.amount}>
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
            prefix={swappingCurrency[0] === 'main' ? main : wrap}
            prefixClassName={styles.prefix}
          />
        </div>
        <div className={styles.iconWrapper}>
          <div
            className={styles.icon}
            onClick={handleConvert}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <img src={iconSwap} alt="Swap" />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Text className={styles.label} size="m" color="lightGray" weight="medium">
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
            prefix={swappingCurrency[1] === 'main' ? main : wrap}
            prefixClassName={styles.prefix}
          />
        </div>
        <div className={styles.btns}>
          <Button
            className={cn('button', styles.button)}
            onClick={handleSubmitConvert}
            loading={isLoading}
            disabled={+payInput > +currentBalance || +payInput <= 0}
          >
            Convert
          </Button>
        </div>
      </div>
    );
  },
);

export default Swap;
