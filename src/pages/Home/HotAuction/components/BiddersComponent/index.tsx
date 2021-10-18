import { FC } from 'react';
import { Text } from 'components';
import cn from 'classnames';
import BigNumber from 'bignumber.js/bignumber';

import { IBidder } from 'typings';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  bidders: IBidder[];
};

const BiddersComponent: FC<Props> = ({ className, bidders }) => (
  <div className={cn(className, styles.comp)}>
    <Text color="lightGray" size="l">{`${bidders.length} people already bidded`}</Text>
    <div className={styles.bidderContainer}>
      {bidders.map((bidder) => {
        return (
          <div key={bidder.id} className={styles.bidderWrapper}>
            <div className={styles.bidderImg}>
              <img src={bidder.bidder_avatar} alt="" />
            </div>
            <div>
              <Text className={styles.bidderValue}>{`${(+new BigNumber(
                bidder.amount,
              )).toString()} ${bidder.currency.symbol.toUpperCase()}`}</Text>
              <Text color="lightGray" className={styles.bidderName}>
                {bidder.bidder}
              </Text>
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
