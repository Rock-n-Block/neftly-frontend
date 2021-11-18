import { VFC } from 'react';

import { Button, H2 } from 'components';

import styles from './LostPage404.module.scss';

import { Robot } from 'assets/img';

const LostPage404: VFC = () => {
  return (
    <section className={styles.page}>
      <div className={styles.top}>
        <H2 align="center" className={styles.title}>
          This page is lost.
        </H2>
        <Button href="/">Navigate back home</Button>
      </div>
      <div className={styles.body}>
        <Robot />
      </div>
    </section>
  );
};

export default LostPage404;
