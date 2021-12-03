import { FC } from 'react';
import cx from 'classnames';
import { Button, H2, Text } from 'components';
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
        <H2 align="center">
          HOW IT WORK FOR <span className={styles.gradientTitle}>DESIGNER</span>
        </H2>
      </div>
      <div className={styles.cardsWrapper}>
        {createAndSellNftHelperObject.map(({ IconComponent, title, description }) => {
          return (
            <div key={title} className={styles.howItWorksCard}>
              <IconComponent />
              <Text weight="medium" size="xl">
                {title}
              </Text>
              <Text color="gray" size="m" align="center">
                {description}
              </Text>
            </div>
          );
        })}
      </div>
      <Button color="purple" className={styles.button}>
        Start selling now
      </Button>
    </div>
  );
});

export default CreateAndSell;
