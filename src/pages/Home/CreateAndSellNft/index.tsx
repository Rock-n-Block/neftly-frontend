import { FC } from 'react';
import cx from 'classnames';
import { H2, Text } from 'components';
import { observer } from 'mobx-react-lite';

import { createAndSellNftHelperObject } from './helperObject';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const CreateAndSell: FC<Props> = observer(({ className }) => {
  return (
    <div className={cx(styles.ourArtworkGallery, className)}>
      <div className={styles.title}>
        <H2>
          CREATE AND SELL YOUR <span className={styles.gradientTitle}>NFTS</span>
        </H2>
      </div>
      <div className={styles.cardsWrapper}>
        {createAndSellNftHelperObject.map(({ IconComponent, title, description }) => {
          return (
            <div key={title} className={styles.howItWorksCard}>
              <IconComponent />
              <Text>{title}</Text>
              <Text>{description}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CreateAndSell;
