import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { userApi } from '../../services/api';
import { useMst } from '../../store/store';
import { IOwner } from '../../typings/UserInfo';
import Bid from '../Bid';
import Icon from '../Icon';
import Modal from '../Modal';

import styles from './Card.module.scss';

// TODO: fix any type in item property
interface ICardProps {
  className?: string;
  item: any;
}

const Card: React.FC<ICardProps> = observer(({ className, item }) => {
  const { user } = useMst();
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [isLike, setIsLike] = useState(item.is_liked);
  const [isOwner, setIsOwner] = useState(false);
  const fetchLike = useCallback(() => {
    userApi.like({ id: item.id });
  }, [item]);

  const checkIsOwner = useCallback(() => {
    if (item.owners) {
      if (Array.isArray(item.owners)) {
        setIsOwner(
          !!item.owners.find((owner: IOwner) => {
            return owner.id === user.id;
          }),
        );
      } else {
        setIsOwner(user.id === item.owners.id);
      }
    }
  }, [item.owners, user.id]);

  useEffect(() => checkIsOwner(), [checkIsOwner]);
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <Link to={`/item/${item.id}`} className={styles.medialink}>
          <img src={item.media || '/images/content/card-pic-6.jpg'} alt="Card" />
        </Link>
        <div
          className={cn(
            { 'status-green': item.category === 'green' },
            styles.category,
            styles.hidden,
          )}
        >
          {/* {item.categoryText} */}
          123
        </div>
        <button
          type="button"
          className={cn(styles.favorite, styles.hidden, { [styles.active]: isLike })}
          onClick={() => {
            setIsLike(!isLike);
            fetchLike();
          }}
        >
          <Icon name="heart" size="20" />
        </button>
        {item.is_auc_selling && !isOwner && (
          <button
            type="button"
            className={cn('button-small', styles.button, styles.hidden)}
            onClick={() => setVisibleModalBid(true)}
          >
            <span>Place a bid</span>
            <Icon name="scatter-up" size="16" />
          </button>
        )}
      </div>
      <Link className={styles.link} to={`/item/${item.id}`}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.name}</div>
            {item.price && (
              <div className={styles.price}>
                <div className={styles.inner}>
                  <span className="text-gradient">
                    {item.price} {item.currency.symbol}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              {/* TODO: delete any */}
              {
                item.owners &&
                  // item.owners.map((x: any) => (
                  (item.standart === 'ERC721' ? (
                    <div className={styles.avatar} key={nextId()}>
                      <img src={item.owners.avatar} alt="Avatar" />
                    </div>
                  ) : (
                    item.owners.map((x: any) => (
                      <div className={styles.avatar} key={nextId()}>
                        <img src={x.avatar} alt="Avatar" />
                      </div>
                    ))
                  ))
                // ))
              }
            </div>
            <div className={styles.counter}>{item.total_supply} in stock</div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <Icon name="candlesticks-up" size="20" />
            Highest bid <span>{item.highestBid}</span>
          </div>
          <div className={styles.bid} dangerouslySetInnerHTML={{ __html: item.bid }} />
        </div>
      </Link>

      <Modal visible={visibleModalBid} onClose={() => setVisibleModalBid(false)}>
        {/* <Connect /> */}
        <Bid
          id={item.id}
          title={item.name}
          available={item.available}
          creatorName={item.creator.name}
          price={item.price}
          currency={item.currency.symbol}
        />
      </Modal>
    </div>
  );
});

export default Card;
