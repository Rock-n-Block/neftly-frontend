import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { IBaseInfo, IOwner } from 'typings';

import styles from './Users.module.scss';

interface IUsersProps {
  className?: string;
  // items: Array<{ name: string; position: string; avatar: string; reward: string }>;
  owners: any;
  creator: IBaseInfo | undefined;
  history?: any;
  bids?: any;
}

const Users: React.FC<IUsersProps> = ({ className, owners, creator, history, bids }) => {
  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.list}>
        {owners &&
          (owners.length ? (
            owners.map((owner: IOwner) => (
              <Link to={`/profile/${owner ? owner.id : ''}`} key={nextId()}>
                <div className={styles.item}>
                  <div className={styles.avatar}>
                    <img src={owner ? owner.avatar : ''} alt="Avatar" />
                    <div className={styles.reward}>
                      <img src="/images/content/reward-1.svg" alt="Reward" />
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.position}>Owner</div>
                    <div className={styles.name}>{owner ? owner.name : ''}</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Link to={`/profile/${owners ? owners.id : ''}`}>
              <div className={styles.item} key={nextId()}>
                <div className={styles.avatar}>
                  <img src={owners ? owners.avatar : ''} alt="Avatar" />
                  <div className={styles.reward}>
                    <img src="/images/content/reward-1.svg" alt="Reward" />
                  </div>
                </div>
                <div className={styles.details}>
                  <div className={styles.position}>Owner</div>
                  <div className={styles.name}>{owners ? owners.name : ''}</div>
                </div>
              </div>
            </Link>
          ))}
        {creator && (
          <Link to={`/profile/${creator?.id}`}>
            <div className={styles.item} key={nextId()}>
              <div className={styles.avatar}>
                <img src={creator?.avatar} alt="Avatar" />
              </div>
              <div className={styles.details}>
                <div className={styles.position}>Creator</div>
                <div className={styles.name}>{creator?.name}</div>
              </div>
            </div>
          </Link>
        )}
        {history &&
          history.map((item: any) => (
            <Link to={`/profile/${item.id}`}>
              <div className={styles.item} key={nextId()}>
                <div className={styles.avatar}>
                  <img src={item.avatar} alt="Avatar" />
                </div>
                <div className={styles.details}>
                  <div className={styles.position}>{item.method}</div>
                  <div className={styles.name}>{item.name}</div>
                </div>
              </div>
            </Link>
          ))}
        {bids &&
          bids.map((bid: any) => (
            <Link to={`/profile/${bid.bidder_id}`}>
              <div className={styles.item} key={nextId()}>
                <div className={styles.avatar}>
                  <img src={bid.bidder_avatar} alt="Avatar" />
                </div>
                <div className={styles.details}>
                  <div className={styles.position}>
                    {(+bid.amount).toFixed(3)} {bid.currency.name}
                  </div>
                  <div className={styles.name}>{bid.bidder}</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Users;
