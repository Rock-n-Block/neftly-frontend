import React, { useState } from 'react';
// import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { observer } from 'mobx-react';

import iconSwap from '../../../../assets/img/icons/arrows-swap.svg';
import { useWalletConnectorContext } from '../../../../services/walletConnect';
import { WalletConnect } from '../../../../services/walletService';
import { useMst } from '../../../../store';
import { Button, TextInput } from 'components';

import styles from './Swap.module.scss';
// import Icon from '../Icon';

interface ISwapProps {
  className?: string;
  close: () => void;
  main: string;
  wrap: 'WBNB' | 'WETH' | 'NFT' | 'BEP20' | 'WMATIC';
}


const Swap: React.FC<ISwapProps> = observer(({ className, close, main, wrap }) => {
  const { user } = useMst();
  const [swappingCurrency, setSwappingCurrency] = useState<Array<'main' | 'wrap'>>([
    'main',
    'wrap',
  ]);
  const [isLoading, setLoading] = useState(false);
  const walletConnector = useWalletConnectorContext();
  const [payInput, setPayInput] = useState('');
  const handleConvert = (): void => {
    if (swappingCurrency[0] === 'main') {
      setSwappingCurrency(['wrap', 'main']);
    } else {
      setSwappingCurrency(['main', 'wrap']);
    }
    setPayInput('');
  };
  const handleSubmitConvert = (): void => {
    const weiValue = WalletConnect.calcTransactionAmount(payInput, 18);
    setLoading(true);
    if (swappingCurrency[0] === 'main') {
      walletConnector.walletService
        .createTransaction('deposit', [], wrap, '', '', '', weiValue)
        .then(async () => {
          // await handleUpdateBalance();
          setLoading(false);
          close();
        })
        .catch((err: any) => {
          setLoading(false);
          console.log('error', err);
        });
    } else {
      walletConnector.walletService
        .createTransaction('withdraw', [weiValue], wrap)
        .then(async () => {
          // await handleUpdateBalance();
          setLoading(false);
          close();
        })
        .catch((err: any) => {
          setLoading(false);
          console.log('error', err);
        });
    }
  };

  const currentBalance = React.useMemo(() => {
    if (swappingCurrency[0] === 'main') {
      return user.balance?.eth;
    }
    return user.balance?.weth;
  }, [user.balance, swappingCurrency]);
  return (
    <div className={cn(className, styles.swap)}>
      <div className={cn('h4', styles.title)}>Convert</div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.label}>You pay</span>
          <span className={styles.amount}>
            Max amount is {swappingCurrency[0] === 'main' ? user.balance?.eth : user.balance?.weth}
          </span>
        </div>
        <TextInput
          className={styles.input}
          type="number"
          name="Pay input"
          label=""
          placeholder="Enter an amount"
          value={payInput}
          onChange={(e) => setPayInput(e.target.value)}
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
          <span className={styles.label}>You recieve</span>
        </div>
        <TextInput
          className={styles.input}
          type="number"
          name="Pay input"
          label=""
          placeholder="Amount you will receive"
          value={payInput}
          onChange={(e) => setPayInput(e.target.value)}
          prefix={swappingCurrency[1] === 'main' ? main : wrap}
          prefixClassName={styles.prefix}
        />
      </div>
      <div className={styles.btns}>
        <Button
          className={cn('button', styles.button)}
          onClick={handleSubmitConvert}
          loading={isLoading}
          disabled={+payInput > +currentBalance}
        >
          Convert
        </Button>
      </div>
    </div>
  );
});

export default Swap;
