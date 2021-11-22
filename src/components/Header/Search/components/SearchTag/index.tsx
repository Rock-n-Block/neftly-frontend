import { VFC } from 'react';
import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  image: string;
  title: string;
  price: string | number;
  asset: string;
  isAuction: boolean;
  inStock: number;
  className?: string;
};

const SearchTag: VFC<Props> = ({ image, title, price, asset, isAuction, inStock, className }) => (
  <div className={cx(styles.searchTag, className)}>
    <div className={styles.searchTagFlexContainer}>
      <img className={styles.searchTagImg} src={image} alt="art" />
      <div>
        <Text size="m" weight="medium">
          {title}
        </Text>
        <Text size="m" color="darkenGray">{`On sale for ${price} ${asset}`}</Text>
      </div>
    </div>
    <div className={styles.searchTagInfo}>
      <Text
        size="m"
        weight="medium"
        className={cx(styles.typeText, { [styles.auction]: isAuction })}
      >
        {isAuction ? 'Auction' : 'Sale'}
      </Text>
      {!isAuction && <Text size="s">{`in stock: ${inStock}`}</Text>}
    </div>
  </div>
);

export default SearchTag;
