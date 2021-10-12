import nextId from 'react-id-generator';
import cn from 'classnames';

import styles from './Sellers.module.scss';
import { sliceString } from 'utils';

interface ISellersProps {
  className?: string;
  owners: any;
  openCheckout: (value: string) => void;
  user: string | number | null;
}

const Sellers: React.FC<ISellersProps> = ({ className, owners, openCheckout, user }) => {
  return (
    <div className={cn(className, styles.sellers)}>
      <div className={cn('h4', styles.title)}>Owners</div>
      <div className={styles.table}>
        {owners
          .filter((owner: any) => owner.id !== user)
          .map(
            (x: any) =>
              x.price && (
                <div className={styles.item} key={nextId()}>
                  <div className={styles.user}>
                    <div className={styles.avatar}>
                      <img src={x.avatar} alt="Avatar" />
                    </div>
                    <div className={styles.details}>
                      <div className={styles.name}>
                        {x.name.length > 15 ? sliceString(x.name) : x.name}
                      </div>
                      <div className={styles.amount}>{x.quantity} token</div>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <div className={styles.balance}>
                      <div className={cn('text-gradient', styles.price)}>{x.price}</div>
                      <div className={styles.currency}>{x.currency.name}</div>
                    </div>
                    <button
                      type="button"
                      className={cn('button', styles.button)}
                      onClick={() => openCheckout(x.id)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ),
          )}
      </div>
    </div>
  );
};

export default Sellers;
