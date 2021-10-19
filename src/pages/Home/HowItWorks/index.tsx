import { FC } from 'react';
import { howItWorksFill, howItWorksPlanet, howItWorksUpload } from 'assets/img';
import cx from 'classnames';
import { Button, H2, Text } from 'components';
import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';

type Props = {
  className?: string;
};

const HowItWorks: FC<Props> = observer(({ className }) => {
  const { user } = useMst();

  return (
    <div className={cx(styles.ourArtworkGallery, className)}>
      <div className={styles.title}>
        <H2>
          HOW IT WORKS FOR <span className={styles.gradientTitle}>DESIGNER</span>
        </H2>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.howItWorksCard}>
          <img src={howItWorksUpload} alt="" />
          <Text align="center" size="xl">
            Upload your best and unique work
          </Text>
          <Text align="center" color="lightGray" size="m">
            Start upload your work by creating an account and connect the crypto wallet.
          </Text>
        </div>
        <div className={styles.howItWorksCard}>
          <img src={howItWorksFill} alt="" />
          <Text align="center" size="xl">
            Fill out product info & price
          </Text>
          <Text align="center" color="lightGray" size="m">
            Fill out the required info and set for pricing and buying option
          </Text>
        </div>
        <div className={styles.howItWorksCard}>
          <img src={howItWorksPlanet} alt="" />
          <Text align="center" size="xl">
            Voila!, your product is on the radar
          </Text>
          <Text align="center" color="lightGray" size="m">
            Let we work on your products, just monitor the traffic on the dashboard and waiting for
            the income, then relax
          </Text>
        </div>
      </div>
      {!!user.address && (
        <div className={styles.viewMoreBtnWrapper}>
          <Link to={routes.create.root}>
            <Button className={styles.viewMoreBtn}>Start selling now</Button>
          </Link>
        </div>
      )}
    </div>
  );
});

export default HowItWorks;
