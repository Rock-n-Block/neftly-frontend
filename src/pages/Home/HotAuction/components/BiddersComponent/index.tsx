import { FC } from 'react';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  bidders: any[];
};

const BiddersComponent: FC<Props> = ({ className, bidders }) => (
  <div className={className}>
    <Text color="lightGray" size="l">{`${bidders.length} people already bidded`}</Text>
    <div className={styles.bidderContainer}>
      {bidders.map((bidder) => {
        return (
          <div key={bidder.bid} className={styles.bidderWrapper}>
            <img src={bidder.avatar} alt="" />
            <div>
              <Text>{`${bidder.bid} ${bidder.bidAsset}`}</Text>
              <Text color="lightGray">{bidder.name}</Text>
            </div>
          </div>
        );
      })}
    </div>
    <Text color="gray">
      By placing a bid, we reserve funds from your Ethereum account till the end of the auction
    </Text>
  </div>
);

export default BiddersComponent;
