import { FC } from 'react';
import { tradingOffer } from 'assets/img';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  expirationDate: number;
};

const TradingHistoryExpiration: FC<Props> = ({ className, expirationDate }) => {
  const isExpired = expirationDate > Date.now();
  const formatFunctionMock = (date: any) => {
    return date;
  };
  return (
    <div className={cx(styles.tradingHistoryCells, className)}>
      <img src={tradingOffer} alt="" />
      <Text style={{ textTransform: 'capitalize' }} size="m">
        {isExpired ? (
          <Text>{formatFunctionMock(expirationDate)}</Text>
        ) : (
          <Text color="red">Expired</Text>
        )}
      </Text>
    </div>
  );
};

export default TradingHistoryExpiration;
