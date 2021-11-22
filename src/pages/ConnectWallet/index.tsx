import { VFC } from 'react';
import { ChooseWallet, H2 } from 'components';

import styles from './ConnectWallet.module.scss';

const ConnectWallet: VFC = () => {
  return (
    <section className={styles.page}>
      <div className={styles.top}>
        <H2 align="center" className={styles.title}>
          Pick a wallet
        </H2>
      </div>
      <div className={styles.body}>
        <ChooseWallet />
      </div>
    </section>
  );
};

export default ConnectWallet;
