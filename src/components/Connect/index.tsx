import React from 'react';
import cn from 'classnames';

import Icon from '../Icon';

import styles from './Connect.module.scss';

interface IConnectProps {
  className?: string;
}

const Connect: React.FC<IConnectProps> = ({ className }) => {
  return (
    <div className={cn(className, styles.connect)}>
      <div className={styles.icon}>
        <Icon name="wallet" size="24" />
      </div>
      <div className={styles.info}>
        You need to connect your wallet first to sign messages and send transaction to Ethereum
        network
      </div>
      <div className={styles.btns}>
        <button type="button" className={cn('button', styles.button)}>
          Connect wallet
        </button>
        <button type="button" className={cn('button-stroke', styles.button)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

Connect.defaultProps = {
  className: '',
};

export default Connect;
