import React, { useState } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { observer } from 'mobx-react';

import iconSwap from '../../../../assets/img/icons/arrows-swap.svg';
import { useWalletConnectorContext } from '../../../../services/walletConnect';
import MetamaskService from '../../../../services/web3';
import { useMst } from '../../../../store/store';
import Button from '../../../Button';
import TextInput from '../../../TextInput';

import styles from './Swap.module.scss';
// import Icon from '../Icon';

interface ISwapProps {
  className?: string;
  close: () => void;
}

const Swap: React.FC<ISwapProps> = observer(({ className, close }) => {
  const { user } = useMst();
  const [swappingCurrency, setSwappingCurrency] = useState<Array<'ETH' | 'WETH'>>(['ETH', 'WETH']);
  const [isLoading, setLoading] = useState<boolean>(false);
  const walletConnector = useWalletConnectorContext();
  const [payInput, setPayInput] = useState('');
  const handleConvert = (): void => {
    if (swappingCurrency[0] === 'ETH') {
      setSwappingCurrency(['WETH', 'ETH']);
    } else {
      setSwappingCurrency(['ETH', 'WETH']);
    }
    setPayInput('');
  };
  const handleSubmitConvert = (): void => {
    const weiValue = MetamaskService.calcTransactionAmount(payInput, 18);
    setLoading(true);
    if (swappingCurrency[0] === 'ETH') {
      walletConnector.metamaskService
        .createTransaction('deposit', [], 'WETH', '', '', '', weiValue)
        .then(() => {
          setLoading(false);
          close();

          user.setBalance(
            new BigNumber(user.balance.eth).minus(new BigNumber(payInput)).toString(10),
            'eth',
          );
          user.setBalance(
            new BigNumber(user.balance.weth).plus(new BigNumber(payInput)).toString(10),
            'weth',
          );
        })
        .catch((err: any) => {
          setLoading(false);
          console.log('error', err);
        });
    } else {
      walletConnector.metamaskService
        .createTransaction('withdraw', [weiValue], 'WETH')
        .then(() => {
          setLoading(false);
          close();

          user.setBalance(
            new BigNumber(user.balance.eth).plus(new BigNumber(payInput)).toString(10),
            'eth',
          );
          user.setBalance(
            new BigNumber(user.balance.weth).minus(new BigNumber(payInput)).toString(10),
            'weth',
          );
        })
        .catch((err: any) => {
          setLoading(false);
          console.log('error', err);
        });
    }
  };
  return (
    <div className={cn(className, styles.swap)}>
      <div className={cn('h4', styles.title)}>Convert</div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.label}>You pay</span>
          <span className={styles.amount}>
            Max amount is {swappingCurrency[0] === 'ETH' ? user.balance?.eth : user.balance?.weth}
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
          suffix={swappingCurrency[0]}
          suffixClassName={styles.suffix}
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
          suffix={swappingCurrency[1]}
          suffixClassName={styles.suffix}
        />
      </div>
      <div className={styles.btns}>
        <Button
          className={cn('button', styles.button)}
          onClick={handleSubmitConvert}
          loading={isLoading}
        >
          Convert
        </Button>
      </div>
    </div>
  );
});

export default Swap;
