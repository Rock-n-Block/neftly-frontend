import { FC } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Button, H2, Text } from 'components';
import { numberFormatter } from 'utils';
import { data } from './mockData';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const DiscoverMore: FC<Props> = ({ className }) => (
  <div className={cx(styles.discoverMore, className)}>
    <Link to="/discover" className={styles.discoverBtnLink}>
      <Button className={cx(styles.infoWrapper, styles.discoverBtn)}>
        <Text color="black" size="xl">
          Discover more
        </Text>
      </Button>
    </Link>
    <div className={styles.infoContainer}>
      {data.map((element) => {
        const { label, amount } = element;
        return (
          <div className={styles.infoWrapper}>
            <H2 className={styles.title}>{numberFormatter(amount, 3)}</H2>
            <Text className={styles.text} size="xl">
              {label}
            </Text>
          </div>
        );
      })}
    </div>
  </div>
);

export default DiscoverMore;
