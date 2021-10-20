import { FC } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { Copyable, Text } from 'components';
import { IBidder } from 'typings';
import { sliceString } from 'utils';

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
              <Copyable valueToCopy={bidder.bidder} className={styles.bidderName}>
                <Text color="lightGray">{sliceString(bidder.bidder)}</Text>
              </Copyable>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default BiddersComponent;
