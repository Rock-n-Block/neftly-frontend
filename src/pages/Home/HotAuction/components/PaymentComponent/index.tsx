import { FC } from 'react';
import { Button, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  bidAction: () => void;
  currentPrice: number;
  priceAsset: string;
};

const PaymentComponent: FC<Props> = ({ className, bidAction, currentPrice, priceAsset }) => (
  <div className={className}>
    <div className={styles.priceWrapper}>
      <div>
        <Text color="lightGray">Current Price</Text>
        <Text size="xl">{`${currentPrice} ${priceAsset}`}</Text>
      </div>
      <div>
        <Text color="lightGray">Auction Ending in</Text>
        <Text size="xl">14.45</Text>
      </div>
    </div>
    <Button onClick={bidAction} isFullWidth>
      Place a Bid
    </Button>
  </div>
);

export default PaymentComponent;
