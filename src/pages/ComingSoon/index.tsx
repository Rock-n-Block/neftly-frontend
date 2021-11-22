import { VFC } from 'react';

import { H2, Button } from 'components';

import { RobotGreen } from 'assets/img';

import styles from './ComingSoon.module.scss';

const ComingSoon: VFC = () => {
  return (
    <section className={styles.page}>
      <div className={styles.top}>
        <H2 align="center" className={styles.title}>
          Something will appear here soon.
        </H2>
        <Button href="/">Navigate back home</Button>
      </div>
      <div className={styles.body}>
        <RobotGreen />
      </div>
    </section>
  );
};

export default ComingSoon;
