import { FC } from 'react';
import cx from 'classnames';
import { Text, TextInput } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const FooterEmail: FC<Props> = ({ className }) => (
  <div className={cx(styles.footerEmail, className)}>
    <Text size="xxl" color="white" weight="bold">
      Stay in the loop
    </Text>
    <Text size="m" color="white" className={styles.text}>
      Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and
      tips and tricks for navigating OpenSea.
    </Text>
    <TextInput isButton placeholder="Enter your email" type="text" className={styles.button} />
  </div>
);

export default FooterEmail;
