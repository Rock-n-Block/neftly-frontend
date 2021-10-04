import { FC } from 'react';
import { growth as growthImg } from 'assets/img';
import cx from 'classnames';
import { Button, H4, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  type: 'auction' | 'sell';
  className?: string;
  bidAction?: () => void;
  growthUsd?: number;
  growth?: number;
  price: number | string;
  asset: string;
  isUserCanBuyNft?: boolean;
  isUserCanEnterInAuction?: boolean;
  isUserCanPutOnSale?: boolean;
};

const PaymentComponent: FC<Props> = ({
  className,
  bidAction,
  price,
  asset,
  type,
  growthUsd,
  growth,
  isUserCanBuyNft,
  isUserCanEnterInAuction,
  isUserCanPutOnSale,
}) => {
  const isGrowPositive = growth ? growth > 0 : false;

  return (
    <div className={cx(className, { [styles.paymentSell]: type === 'sell' })}>
      <div className={styles.priceWrapper}>
        <div>
          <Text color="lightGray">{type === 'sell' ? 'Current Price' : 'Highest Bid'}</Text>
          <div className={styles.priceAndGrowth}>
            {price ? <H4>{`${price} ${asset}`}</H4> : ''}
            {type === 'sell' && <Text size="m">{`($${growthUsd})`}</Text>}
          </div>
          {type === 'sell' && (
            <Text size="m" className={styles.growthWrapper}>
              <img
                className={cx(styles.growth, { [styles.negativeGrowth]: !isGrowPositive })}
                src={growthImg}
                alt=""
              />
              {`${isGrowPositive ? '+' : '-'}${growth}%`}
            </Text>
          )}
        </div>
        {/* {type === 'auction' && (
          <div>
            <Text color="lightGray">Auction Ending in</Text>
            <Text size="xl">14.45</Text>
          </div>
        )} */}
      </div>

      <div className={styles.sellBtnsWrapper}>
        {isUserCanBuyNft ? (
          <Button onClick={bidAction} isFullWidth>
            Purchase Now
          </Button>
        ) : (
          ''
        )}
        {isUserCanEnterInAuction ? (
          <Button onClick={bidAction} isFullWidth>
            Place a Bid
          </Button>
        ) : (
          ''
        )}
        {isUserCanPutOnSale ? (
          <Button onClick={bidAction} isFullWidth>
            Put on Sale
          </Button>
        ) : (
          ''
        )}
        <Button color="outline" onClick={bidAction} isFullWidth>
          Save
        </Button>
      </div>
    </div>
  );
};

export default PaymentComponent;
